'use client';

import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { RecordsContext } from '@/context-providers/RecordsProvider';
import { getCategoryNameById } from '@/utils/categories/getCategoryNameById';
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import styles from './assets/RecordsList.module.css'

export default function RecordsList(
  {
    session,
    setShowRecordFormModal,
    setSelectedRecordId,
    selectedCategoryId,
  }: {
    session: any,
    setShowRecordFormModal: (value: boolean) => void,
    setSelectedRecordId: (value: GridRowIdGetter) => void,
    selectedCategoryId?: number,
  }
) {
  const categories = useContext(CategoriesContext);
  const categoriesList = categories?.categoriesData ?? [];

  const records = useContext(RecordsContext);
  const recordsList = records?.recordsData ?? [];
  const fetchRecords = records?.fetchRecords ?? (() => { });
  const areRecordsLoading = records?.areRecordsLoading ?? false;

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    if (session) {
      records?.fetchRecords(paginationModel.page + 1, paginationModel.pageSize, selectedCategoryId);
    }
  }, [session, paginationModel, selectedCategoryId]);

  const updateRecord = (recordId: GridRowIdGetter) => () => {
    setShowRecordFormModal(true);
    setSelectedRecordId(recordId);
  }

  const showConfirmDeleteModal = (recordId: GridRowIdGetter) => () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteRecord(recordId);
    }
  }

  const deleteRecord = async (recordId: GridRowIdGetter) => {
    await fetch(
      'http://localhost:3000/api/records/delete',
      {
        method: 'DELETE',
        body: JSON.stringify({
          record_id: recordId,
        })
      }
    );
    await fetchRecords();
  }

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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <div>
          <button onClick={updateRecord(params.row.record_id)}>Edit</button>
          <button onClick={showConfirmDeleteModal(params.row.record_id)}>Delete</button>
        </div>
      ),
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
