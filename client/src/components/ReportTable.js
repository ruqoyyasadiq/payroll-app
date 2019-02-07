import React from 'react'
import Table from 'react-bootstrap/Table'
import { ReportRow } from '../components'
import { array } from 'prop-types'

const ReportTable = ({ reports }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Pay Period</th>
        <th>Amount paid</th>
      </tr>
    </thead>
    <tbody>
      {reports.map(row => <ReportRow report={row} />)}
    </tbody>
  </Table>
)

ReportTable.propTypes = {
  reports: array.isRequired
}

export default ReportTable
