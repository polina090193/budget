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

declare interface Category extends SelectValue {
    link?: string;
}

declare type Categories = Category[]
