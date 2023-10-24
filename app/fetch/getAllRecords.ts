export async function getAllRecords() {
  try {
    const recordsRes = await fetch('http://localhost:3000/api/records');
    const recordsData = await recordsRes.json();

    const recordsDataProcessed = recordsData.map((record: BudgetRecordRes) => ({
      ...record,
      id: record.record_id,
      date: new Date(record.date).toLocaleDateString('de-DE'),
    }));
    
    return recordsDataProcessed;
  } catch (error) {
    console.log('Error by records loading:' + error);
  }
}

export default getAllRecords;
