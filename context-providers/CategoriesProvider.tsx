'use client';

import { createContext, useEffect, useState } from "react";
import getAllCategories from "../app/fetch/categories/getAllCategories";

export const CategoriesContext = createContext<BudgetCategories>([]);

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoriesData, setCategoriesData] = useState<BudgetCategories>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      setCategoriesData(data);
    };

    fetchData();
  }, []);

  return (
    <CategoriesContext.Provider value={categoriesData}>{children}</CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
