import React from 'react'
import renderer from 'react-test-renderer'
import { FileUpload } from '../components'

test('FileUpload renders', () => {
  const component = renderer.create(
    <FileUpload
      fetchReportData={() => {}}
      pageLoading={() => {}}
      toggleModalView={() => {}}
      processErrorMessage={() => {}}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
