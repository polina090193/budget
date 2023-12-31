'use client';

import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { RecordsContext } from '@/context-providers/RecordsProvider';
import { getCategoryNameById } from '@/utils/getCategoryNameById';
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import styles from './RecordsList.module.css'

export default function RecordsList(
  { session }: { session: any }
) {
  const categories = useContext(CategoriesContext);
  const categoriesList = categories?.categoriesData ?? [];

  const records = useContext(RecordsContext);
  const recordsList = records?.recordsData ?? [];
  const areRecordsLoading = records?.areRecordsLoading ?? false;

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  
  useEffect(() => {
    if (session) {
      records?.fetchRecords(paginationModel.page + 1, paginationModel.pageSize);
    }
  }, [session, paginationModel]);

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
      valueGetter: (params: GridValueGetterParams) => getCategoryNameById(categoriesList, params.row.category_id),
    },
  ];

  const getRowId: GridRowIdGetter<any> | undefined = (row) => {
    return row.record_id;
  }

  if (areRecordsLoading) {
    return <p>Loading...</p>
  }

  if (!recordsList || recordsList.length === 0) {
    return <p>No records found. Please add some.</p>
  }

  if (session?.user) {
    return (
      <>
        <DataGrid
          getRowId={getRowId}
          rowCount={!areRecordsLoading && records ? records.total : 0}
          rows={recordsList}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          getRowClassName={(params: GridRowParams<any>) => {
            if (params.row.direction === 'MINUS') {
              return styles.expenseRow;
            }
            return styles.incomeRow;
          }}
          pageSizeOptions={[10, 20, 50]}
          // checkboxSelection
        />
      </>
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
