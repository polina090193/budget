'use client';

import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { getCategoryNameById } from '@/utils/getCategoryNameById';
import { DataGrid, GridColDef, GridRowIdGetter, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useContext } from 'react';

export default function RecordsList(
  { recordsData, user }:
    { recordsData: BudgetRecords, user: NextAuthUser | undefined }
) {
  const categoriesData = useContext(CategoriesContext);

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'sum', headerName: 'Sum', type: 'number', width: 70 },
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
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
        />
      </>
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
