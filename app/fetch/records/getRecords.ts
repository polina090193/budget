async function getRecords(userId?: string | undefined, categoryId?: number) {
  if (!userId) {
    console.log('Error by records loading: user is not defined');
    return;
  }
  
  try {
    const recordsRes = await fetch(
      `http://localhost:3000/api/records?userId=${userId}${categoryId ? '&categoryId=' + categoryId : ''}`,
      { cache: 'no-store' },
    );
    
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
