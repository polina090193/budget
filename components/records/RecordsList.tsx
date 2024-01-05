'use client';

import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { getCategoryNameById } from '@/utils/getCategoryNameById';
import { DataGrid, GridCellParams, GridColDef, GridRowIdGetter, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useContext } from 'react';
import styles from './RecordsList.module.css'

export default function RecordsList(
  { recordsData, user, areRecordsLoading }:
    {
      recordsData: BudgetRecords,
      user: NextAuthUser | undefined,
      areRecordsLoading: boolean
    }
) {
  const categoriesData = useContext(CategoriesContext);

  const columns: GridColDef[] = [
    {
      field: 'direction',
      headerName: '',
      valueGetter: (params) => {
        if (!params.value) {
          return '?';
        } else if (params.value === 'PLUS') {
          return '➕';
        } else if (params.value === 'MINUS') {
          return '➖';
        }
      },
      width: 40
    },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'title', headerName: 'Title', width: 120 },
    { field: 'sum', headerName: 'Sum', type: 'number', width: 80 },
    {
      field: 'category_id',
      headerName: 'Category',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => getCategoryNameById(categoriesData, params.row.category_id),
    },
  ];

  const getRowId: GridRowIdGetter<any> | undefined = (row) => {
    return row.record_id;
  }

  if (areRecordsLoading) {
    return <p>Loading...</p>
  }

  if (!recordsData || recordsData.length === 0) {
    return <p>No records found. Please add some.</p>
  }

  if (user) {
    return (
      <>
        <DataGrid
          getRowId={getRowId}
          rows={recordsData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowClassName={(params: GridRowParams<any>) => {
            if (params.row.direction === 'MINUS') {
              return styles.expenseRow;
            }
            return styles.incomeRow;
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
        />
      </>
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
