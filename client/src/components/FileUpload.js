import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Form, FormControl } from 'react-bootstrap'
import { func } from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios'
import './fileUpload.css'

export default class FileUploadForm extends Component {
  state = {
    loaded: 0,
    processedData: [],
    processingUpload: false,
    selectedFile: null,
    uploadInProgress: false
  }

  static propTypes = {
    fetchReportData: func,
    pageLoading: func.isRequired,
    processErrorMessage: func.isRequired,
    toggleModalView: func.isRequired
  }

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    })
  }

  handleFileUpload = () => {
    const data = new FormData()
    data.append('uploadCsv', this.state.selectedFile)
    this.props.pageLoading(true)
    this.setState({
      processingUpload: true
    })

    axios.post('/v1/reports/new', data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          uploadInProgress: true,
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        })
      },
    }).then(res => {
      this.setState({
        loaded: 0,
        processingUpload: false,
        uploadInProgress: false,
        processedData: res.data.result
      })
      this.props.toggleModalView(false) // close modal
      this.props.pageLoading(false) // disable loader since data has arrived.
      this.props.fetchReportData() // refresh report table
    }).catch(err => {
      this.props.pageLoading(false)
      const error = err.response
      if(error.status === 409) {
        this.props.processErrorMessage(error.data.message)
      } else {
        this.props.processErrorMessage('Unable to process upload. Please try again.')
      }
    })
  }

  render() {
    const { uploadInProgress, loaded, selectedFile } = this.state
    const disableUpload = selectedFile ? false : true
    return (
      <div>
        <p>Select a Time Report to upload.</p>
        <Form>
          <FormControl
            name=''
            id=''
            type='file'
            onChange={this.handleSelectedFile}
            placeholder="Select a Time Report to upload"
            className="mr-sm-2"
          />
          <Button id='upload-btn' variant="outline-primary" onClick={this.handleFileUpload} disabled={disableUpload}> Upload </Button>
        </Form>
        {uploadInProgress && (loaded !== 100) && (
          <ProgressBar
            striped
            variant="info"
            now={Math.round(loaded, 2) }
          />
        )}
      </div>
    )
  }
}
