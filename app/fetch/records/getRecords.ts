async function getRecords(page?: number, pageSize?: number, categoryId?: number) {
  let fetchURL = 'http://localhost:3000/api/records';
  fetchURL += page ? `&page=${page}` : '';
  fetchURL += pageSize ? `&pageSize=${pageSize}` : '';
  fetchURL += categoryId ? `&categoryId=${categoryId}` : '';
  
  try {
    const recordsRes = await fetch(fetchURL, { cache: 'no-store' });
    
    const recordsData = await recordsRes.json();

    const recordsDataProcessed = recordsData.map((record: BudgetRecord) => ({
      ...record,
      id: record.record_id,
      date: new Date(record.date).toLocaleDateString('de-DE'),
    }));

    return recordsDataProcessed || [];
  } catch (error) {
    console.log('Error by records loading:' + error);
    return [];
  }
}

export default getRecords;
