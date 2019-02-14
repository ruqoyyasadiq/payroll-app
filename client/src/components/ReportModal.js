import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import { bool, func } from 'prop-types'
import { FileUpload } from '../components'


export default class ReportModal extends Component {

  state = {
    show: false,
    uploadErrorMessage: null
  };

  static propTypes = {
    pageLoading: func,
    showModal: bool.isRequired,
    toggleModalView: func.isRequired,
    fetchReportData: func.isRequired
  }

  static defaultProps = {
    pageLoading: () => {}
  }

  handleClose = () => {
    this.props.toggleModalView(false)
    this.processErrorMessage('')
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  processErrorMessage = message => {
    this.setState({
      errorMessage: message
    })
  }

  render() {
    const { fetchReportData, pageLoading, showModal } = this.props
    const { errorMessage } = this.state
    return (
      <>
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Time Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <FileUpload
              fetchReportData={fetchReportData}
              pageLoading={pageLoading}
              toggleModalView={this.props.toggleModalView}
              processErrorMessage={this.processErrorMessage}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
