'use client';

import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";
import getRecords from "../app/fetch/records/getRecords";

export const RecordsContext = createContext<{
  recordsData: BudgetRecords,
  areRecordsLoading: boolean,
  fetchRecords: () => void
} | null>(null);

const RecordsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [recordsData, setRecordsData] = useState<BudgetRecords>([]);
  const [areRecordsLoading, setAreRecordsLoading] = useState(false);

  const fetchRecords = useCallback(async () => {
    setAreRecordsLoading(true);
    if (!session?.user) {
      console.log('Error by records loading on client: user is not defined');
      return;
    }

    try {
      const newRecordsData = await getRecords();
      setRecordsData(newRecordsData);
    } catch (error) {
      console.log('Error by records loading on client:' + error);
    }
    setAreRecordsLoading(false);
  }, [session?.user?.id, setRecordsData]);

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <RecordsContext.Provider value={{recordsData, areRecordsLoading, fetchRecords}}>{children}</RecordsContext.Provider>
  );
}

export default RecordsProvider;
