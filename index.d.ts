declare interface BudgetRecord {
    record_id: number;
    date: string;
    title: string;
    direction: 'PLUS' | 'MINUS';
    sum: number;
    category_id: number;
    user_id: number;
}

declare interface BudgetRecordReq extends Omit<BudgetRecord, 'record_id'> {}

declare type BudgetRecords = (BudgetRecord | BudgetRecordReq)[]

declare interface BudgetRecordsWithUpdate {
    recordsData: BudgetRecords,
    updateRecordsData: void
}

declare interface SelectValue {
    id: number;
    name: string;
    isPlaceholder?: boolean;
}

declare interface BudgetCategory {
    category_id: number;
    name: string;
    direction: 'PLUS' | 'MINUS';
    user_id: number;
}

declare interface BudgetCategoryReq extends Omit<BudgetCategory, 'category_id'> {}

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
    id?: number;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

declare type FormikErrorsType = string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined
declare type FormikTouchedType = boolean | FormikTouched<any> | FormikTouched<any>[] | undefined