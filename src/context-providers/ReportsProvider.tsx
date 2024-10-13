'use client';

import { useSession } from "next-auth/react";
import { createContext, useCallback, useState } from "react";
import getReportByCategory from "../app/fetch/reports/getReportByCategory";

export const ReportsContext = createContext<{
  reportsByCategory: ReportsByCategorySet;
  areReportsLoading: boolean,
  fetchReportByCategory: (key: string, type?: TransactionType) => void,
} | null>(null);

const ReportsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [reportsByCategory, setReportsByCategory] = useState<ReportsByCategorySet>({});
  const [areReportsLoading, setAreReportsLoading] = useState(false);

  const fetchReportByCategory = useCallback(async (key: string, type?: TransactionType) => {
    setAreReportsLoading(true);
    if (!session?.user) {
      return;
    }

    try {
      const newReportByCategoryRes = await getReportByCategory(type);
      const newReportByCategory = newReportByCategoryRes || [];
      
      setReportsByCategory(prevReports => ({
        ...prevReports,
        [key]: newReportByCategory,
      }));

    } catch (error) {
      console.log('Error by records loading on client:' + error);
    }
    setAreReportsLoading(false);
  }, [session?.user, setReportsByCategory]);

  return (
    <ReportsContext.Provider
      value={{ reportsByCategory, areReportsLoading, fetchReportByCategory }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export default ReportsProvider;
