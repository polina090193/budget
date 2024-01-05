async function getRecords(userId?: string | undefined, page?: number, pageSize?: number, categoryId?: number) {
  if (!userId) {
    console.log('Error by records loading: user is not defined');
    return;
  }

  let fetchURL = 'http://localhost:3000/api/records';
  fetchURL += `?userId=${userId}`;
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
