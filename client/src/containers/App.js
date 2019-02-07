import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Loader from 'react-loader-spinner'
import { NoRecord, ReportModal, ReportTable } from '../components'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    isPageLoading: false,
    reports: {},
    showModal: false,
    reportsLoaded: false,
  }

  componentDidMount () {
    this.setState({
      isPageLoading: false
    })
    this.fetchReportData()
  }

  fetchReportData = () => {
    axios.get('/v1/reports').then(res => {
      this.setState({
        reports: res.data.result,
        reportsLoaded: true,
        isPageLoading: false
      })
    }).catch(() => {
      alert('An error occurred fetching report data. Please try again')
    })
  }

  toggleModalView = value => {
    this.setState({
      showModal: value
    })
  }

  showLoader = value => {
    this.setState({
      isPageLoading: value
    })
  }

  handleShowModal = () => {
    this.toggleModalView(true)
  }

  render() {
    const { isPageLoading, showModal, reports, reportsLoaded } = this.state
    const flattenedReports = Object.keys(reports).reduce((acc, val) => acc.concat(reports[val]), [])
    const reportsLength = Object.keys(reports).length
  
    return (
      <div className='App'>
        <Navbar bg='light' variant='light' style={{zIndex: 1, borderBottom: 'solid 1px #ddd' }}>
          <Navbar.Brand href='#home'>Payroll Report</Navbar.Brand>
        </Navbar>
        <Button variant='primary' id='new-upload-btn' onClick={this.handleShowModal}>+</Button>
        {isPageLoading && <Loader type='ThreeDots' color='#266AD1' height={80} width={80} />}
        {reportsLoaded && reportsLength === 0 && <NoRecord addNewReport={this.handleShowModal} />}
        <ReportModal
          pageLoading={this.showLoader}
          fetchReportData={this.fetchReportData}
          showModal={showModal}
          toggleModalView={this.toggleModalView}
        />
        {(flattenedReports.length > 0) && <ReportTable reports={flattenedReports} />}
      </div>
    )
  }
}

export default App;
