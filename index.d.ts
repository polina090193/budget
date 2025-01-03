declare type TransactionType = "INCOME" | "EXPENSE";

declare interface BudgetRecord {
    record_id: number;
    date: string;
    title: string;
    type: TransactionType;
    sum: number;
    category_id: number;
    user_id: number;
}

declare interface BudgetRecordReq extends Omit<BudgetRecord, 'record_id'> {}

declare type BudgetRecords = (BudgetRecord)[]

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
    type: TransactionType;
    user_id: number;
}

declare interface BudgetCategoryReq extends Omit<BudgetCategory, 'category_id'> {}

declare type BudgetCategories = BudgetCategory[]

declare interface ReportByCategory {
    category_id: number;
    name: string;
    sum: number;
}

declare interface ReportsByCategorySet { [key: string]: ReportByCategory[] }

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