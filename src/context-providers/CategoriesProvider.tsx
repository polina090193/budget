'use client';

import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";
import getAllCategories from "../app/fetch/categories/getAllCategories";

export const CategoriesContext = createContext<{ categoriesData: BudgetCategories, areCategoriesLoading: boolean, fetchCategories: () => void } | null>(null);

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoriesData, setCategoriesData] = useState<BudgetCategories>([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(false);
  const { data: session } = useSession();

  const fetchCategories = useCallback(async () => {
    if (!session?.user) {
      return;
    }

    setAreCategoriesLoading(true);
    const data = await getAllCategories();
    setCategoriesData(data);
    setAreCategoriesLoading(false);
  }, [session?.user, setCategoriesData]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoriesContext.Provider value={{ categoriesData, areCategoriesLoading, fetchCategories }}>{children}</CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
