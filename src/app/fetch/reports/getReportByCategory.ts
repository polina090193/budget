export async function getReportByCategory() {
  try {
    const reportRes = await fetch('http://localhost:3000/api/reports/by-category');
    const reportData = await reportRes.json();

    return reportData.report;
  } catch (error) {
    console.log('Error by loading the report: ' + error);
  }
}

export default getReportByCategory;
