'use client';

import { useContext, useEffect, useMemo } from 'react';
import { ReportsContext } from '@/context-providers/ReportsProvider';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSession } from 'next-auth/react';

export default function PieChartByCategory({ type }: {type?: TransactionType}) {
  const { data: session } = useSession();

  const reports = useContext(ReportsContext);
  const fetchReportByCategory = reports?.fetchReportByCategory ?? (() => { });

  const typeKey = useMemo(() => type?.toLowerCase() || 'all', [type]);

  const reportsData = useMemo(() => reports?.reportsByCategory[typeKey] ?? [], [reports, type]);
  const isReportLoading = reports?.areReportsLoading ?? false;

  useEffect(() => {
    if (session) {
      fetchReportByCategory(typeKey, type);
    }
  }, [session, type]);

  if (isReportLoading) {
    return <p>Loading...</p>
  }

  if (!reportsData || reportsData.length === 0) {
    return <p>No data for the report.</p>
  }

  if (session?.user) {
    return (
      <PieChart
        series={[
          {
            data: reportsData?.map((categoryReport: ReportByCategory, index: number) => ({
              id: index,
              value: categoryReport.count,
              label: categoryReport.name
            })) ?? [],
          },
        ]}
        width={400}
        height={200}
      />
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
