async function getRecords(categoryId?: number) {
  try {
    const recordsRes = await fetch(
      `http://localhost:3000/api/records${categoryId ? '?categoryId=' + categoryId : ''}`,
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
