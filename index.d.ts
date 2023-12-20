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

declare interface ToastProps {
  open: boolean;
  toastSeverity: ToastSeverity;
  toastMessage: string;
  autoHideDuration?: number;
}

declare interface BudgetUserRes {
    user_id: number;
    name?: string;
    email: string;
    password_hash: string;
}

declare interface User extends Omit<BudgetUserRes, 'user_id'> {
    id?: number;
}

declare interface NextAuthUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}
