declare interface BudgetRecordRes {
    record_id: number;
    date: Date;
    title: string;
    direction: 'PLUS' | 'MINUS';
    sum: number;
}

declare interface BudgetRecord extends Omit<BudgetRecordRes, 'record_id'> {
    id: number;
}

declare interface SelectValue {
    id: string;
    name: string;
    slug: string;
}

declare interface BudgetCategoryRes extends Omit<SelectValue, 'id'> {
    category_id: number;
    link?: string;
}

declare interface BudgetCategory extends Omit<BudgetCategoryRes, 'category_id'> {
    id: string;
}

declare type BudgetCategories = BudgetCategory[]

declare type ToastSeverity = "error" | "info" | "success" | "warning";

declare type ToastProps = {
  open: boolean;
  toastSeverity: ToastSeverity;
  toastMessage: string;
  autoHideDuration?: number;
}
