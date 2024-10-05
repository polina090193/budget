export async function getReportByCategory(type?: TransactionType) {
  try {
    let fetchURL = 'http://localhost:3000/api/reports/by-category';
    fetchURL += type ? `?type=${type}` : '';

    const reportRes = await fetch(fetchURL, { cache: 'no-store' });
    const reportData = await reportRes.json();

    return reportData.report;
  } catch (error) {
    console.log('Error by loading the report: ' + error);
  }
}

export default getReportByCategory;
