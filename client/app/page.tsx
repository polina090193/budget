'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import NextLink from 'next/link'

import styles from './page.module.css'

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);

  const getAllRecords = async () => {
    try {
      setRecordsLoading(true);
      const recordsRes = await axios.get('http://localhost:8000/records', {
        params: {
          table: 'budget_records',
        },
      })

      const recordsData = recordsRes.data.map((record: BudgetRecordRes) => ({
        ...record,
        id: record.record_id,
        date: new Date(record.date).toLocaleDateString('de-DE'),
      }));

      setRecords(recordsData);
    } catch (error) {
      console.log('Error by records loading:' + error);
    } finally {
      setRecordsLoading(false);
    }
  }

  useEffect(() => {
    getAllRecords();
  }, [])

  return (
    <main className={styles.main}>
      {recordsLoading ? <p>Loading...</p>
        : records.length ? records.map((record: BudgetRecord) => {
          return (
            <div key={record.id}>
              <strong>{record.title}</strong>
              <p>{record.date.toString()}</p>
              <p>{record.direction}</p>
              <p>{record.sum}</p>
            </div>
          )
        }) : <p>No records</p>}
    </main>
  )
}
