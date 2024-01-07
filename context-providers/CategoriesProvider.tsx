'use client';

import { createContext, useEffect, useState } from "react";
import getAllCategories from "../app/fetch/categories/getAllCategories";

export const CategoriesContext = createContext<{categoriesData: BudgetCategories, areCategoriesLoading: boolean} | null>(null);

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoriesData, setCategoriesData] = useState<BudgetCategories>([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setAreCategoriesLoading(true);
      const data = await getAllCategories();
      setCategoriesData(data);
      setAreCategoriesLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{categoriesData, areCategoriesLoading}}>{children}</CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
