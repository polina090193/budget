'use client';

import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";
import getRecords from "../app/fetch/records/getRecords";

export const RecordsContext = createContext<{
  recordsData: BudgetRecords,
  areRecordsLoading: boolean,
  fetchRecords: (page?: number, pageSize?: number) => void,
  total: number,
} | null>(null);

const RecordsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [recordsData, setRecordsData] = useState<BudgetRecords>([]);
  const [areRecordsLoading, setAreRecordsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchRecords = useCallback(async (page?: number, pageSize?: number) => {
    setAreRecordsLoading(true);
    if (!session?.user) {
      return;
    }

    try {
      const newRecordsData = await getRecords(page || 1, pageSize || 10);
      const newRecordsList = newRecordsData?.records || [];
      setRecordsData(newRecordsList);
      setTotal(newRecordsData?.total || 0);
    } catch (error) {
      console.log('Error by records loading on client:' + error);
    }
    setAreRecordsLoading(false);
  }, [session?.user?.id, setRecordsData]);

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <RecordsContext.Provider value={{recordsData, areRecordsLoading, fetchRecords, total}}>{children}</RecordsContext.Provider>
  );
}

export default RecordsProvider;
