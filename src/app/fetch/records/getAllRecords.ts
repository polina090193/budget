async function getAllRecords(page?: number, pageSize?: number, categoryId?: number): Promise<{
  records: BudgetRecords;
  total: number;
} | undefined> {
  let fetchURL = 'http://localhost:3000/api/records';
  fetchURL += page ? `?page=${page}` : '';
  fetchURL += pageSize ? `&pageSize=${pageSize}` : '';
  fetchURL += categoryId ? `&categoryId=${categoryId}` : '';
  
  try {
    const recordsRes = await fetch(fetchURL, { cache: 'no-store' });
    
    const recordsData = await recordsRes.json();

    const recordsList = recordsData.records;

    const totalRecords = recordsData.total;

    const recordsDataProcessed = recordsList.map((record: BudgetRecord) => ({
      ...record,
      id: record.record_id,
      date: new Date(record.date).toLocaleDateString('de-DE'),
    }));

    return {records: recordsDataProcessed || [], total: totalRecords || 0};
  } catch (error) {
    console.log('Error by records loading:' + error);
    return;
  }
}

export default getAllRecords;
