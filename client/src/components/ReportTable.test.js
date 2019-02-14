import React from 'react'
import renderer from 'react-test-renderer'
import { ReportTable } from '.'

test('ReportTable renders', () => {
  const component = renderer.create(
    <ReportTable reports={[]} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
