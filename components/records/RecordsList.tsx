export default function RecordsList({ recordsData }: { recordsData: BudgetRecord[] }) {

  return (
    <>
        {recordsData?.length ? recordsData.map((record: BudgetRecord) => {
          return (
            <div key={record.id}>
              <strong>{record.title}</strong>
              <p>{record.date.toString()}</p>
              <p>{record.direction}</p>
              <p>{record.sum}</p>
            </div>
          )
        }) : <p>No records</p>}
      </>
      )
}
