'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CategoriesContext } from '@/context-providers/CategoriesProvider';
import { RecordsContext } from '@/context-providers/RecordsProvider';
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { getCategoryNameById } from '@/utils/categories/getCategoryNameById';
import styles from './assets/RecordsList.module.css'
import { useSession } from 'next-auth/react';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/enums/generalEnums';
import PieChartByCategory from '../../components/charts/PieChartByCategory';

export default function RecordsList(
  {
    setShowRecordFormModal,
    setSelectedRecordId,
    selectedCategoryId,
  }: {
    setShowRecordFormModal: (value: boolean) => void,
    setSelectedRecordId: (value: GridRowIdGetter) => void,
    selectedCategoryId?: number,
  }
) {
  const { data: session } = useSession();
  
  const categories = useContext(CategoriesContext);
  const categoriesList = useMemo(() => categories?.categoriesData ?? [], [categories?.categoriesData]);

  const records = useContext(RecordsContext);
  const recordsList = useMemo(() => records?.recordsData ?? [], [records?.recordsData]);
  const fetchRecords = useMemo(() => records?.fetchRecords ?? (() => { }), [records?.fetchRecords]);
  const areRecordsLoading = useMemo(() => records?.areRecordsLoading ?? false, [records?.areRecordsLoading]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE - 1,
  });

  useEffect(() => {
    if (session) {
      fetchRecords(paginationModel.page + 1, paginationModel.pageSize, selectedCategoryId);
    }
  }, [session, paginationModel, selectedCategoryId, fetchRecords]);

  const updateRecord = useCallback((recordId: GridRowIdGetter) => () => {
    setShowRecordFormModal(true);
    setSelectedRecordId(recordId);
  }, [setShowRecordFormModal, setSelectedRecordId]);

  const deleteRecord = useCallback(async (recordId: GridRowIdGetter) => {
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
  }, [fetchRecords]);

  const showConfirmDeleteModal = useCallback((recordId: GridRowIdGetter) => () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      deleteRecord(recordId);
    }
  }, [deleteRecord]);

  const columns: GridColDef[] = useMemo(() => [
    {
      field: 'type',
      headerName: '',
      valueGetter: (params) => {
        if (!params.value) {
          return '?';
        } else if (params.value === 'INCOME') {
          return '➕';
        } else if (params.value === 'EXPENSE') {
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
  ], [updateRecord, showConfirmDeleteModal, categoriesList]);

  const getRowId: GridRowIdGetter<BudgetRecord> | undefined = useCallback((row: BudgetRecord) => {
    return row.record_id;
  }, []);

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
            if (params.row.type === 'EXPENSE') {
              return styles.expenseRow;
            }
            return styles.incomeRow;
          }}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        // checkboxSelection
        />
        {!selectedCategoryId && <PieChartByCategory type="INCOME" />}
        {!selectedCategoryId && <PieChartByCategory type="EXPENSE" />}
      </>
    )
  } else {
    return <p>Authentification error. Please log in again.</p>
  }
}
