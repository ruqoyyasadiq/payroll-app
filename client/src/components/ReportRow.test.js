import React from 'react'
import renderer from 'react-test-renderer'
import { ReportRow } from '.'

test('ReportRow renders', () => {
  const component = renderer.create(
    <ReportRow report={{}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
