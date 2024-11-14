'use client';

import { useContext, useEffect, useMemo } from 'react';
import { ReportsContext } from '@/context-providers/ReportsProvider';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSession } from 'next-auth/react';

export default function PieChartByCategory(
  { type, sx }: 
  {type?: TransactionType, sx?: { [key: string]: unknown }}
) {
  const { data: session } = useSession();

  const reports = useContext(ReportsContext);
  const fetchReportByCategory = useMemo(() => reports?.fetchReportByCategory ?? (() => { }), [reports]);

  const typeKey = useMemo(() => type?.toLowerCase() || 'all', [type]);

  const reportsData = useMemo(() => reports?.reportsByCategory[typeKey] ?? [], [reports, typeKey]);
  const isReportLoading = reports?.areReportsLoading ?? false;

  useEffect(() => {
    if (session) {
      fetchReportByCategory(typeKey, type);
    }
  }, [fetchReportByCategory, session, type, typeKey]);

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
              value: categoryReport.sum,
              label: categoryReport.name
            })) ?? [],
          },
        ]}
        width={500}
        height={200}
        slotProps={{
          legend: {
            position: {horizontal: 'left', vertical: 'top'},
          },
        }}
        margin={{ right: -100 }}
        sx={sx}
      />
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
