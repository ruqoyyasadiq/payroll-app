import React from 'react'

const ReportRow = data => (
  <tr>
    <td>{data.report.employeeId}</td>
    <td>{data.report.datePeriod}</td>
    <td>{data.report.amountPaid}</td>
  </tr>
)

export default ReportRow
