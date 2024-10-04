'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { RecordsContext } from '@/context-providers/RecordsProvider';
import { PieChart } from '@mui/x-charts/PieChart';
import getReportByCategory from '@/app/fetch/reports/getReportByCategory';

export default function RecordsList(
  {
    session,
  }: {
    session: any,
  }
) {
  const records = useContext(RecordsContext);
  const recordsList = records?.recordsData ?? [];
  const areRecordsLoading = records?.areRecordsLoading ?? false;
  const [report, setReport] = useState();

  const fetchReport = useCallback(async () => {
    const report = await getReportByCategory()
    return report
  }, []);

  useEffect(() => {
    if (session) {
      // records?.fetchRecords(paginationModel.page + 1, paginationModel.pageSize, selectedCategoryId);
      fetchReport().then(res => setReport(res))
    }
  }, [session]);

  if (areRecordsLoading) {
    return <p>Loading...</p>
  }

  if (!recordsList || recordsList.length === 0) {
    return <p>No records found. Please add some.</p>
  }

  if (session?.user) {
    return (
      <PieChart
        series={[
          {
            data: report?.map((categoryInfo, index) => ({
              id: index,
              value: categoryInfo.count,
              label: categoryInfo.name
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
