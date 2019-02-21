import React from 'react'
import { render, fireEvent, cleanup, testHook } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'DevOps',
      author: 'A. Korhonen',
      likes: 12
    }

    component = render(
      <SimpleBlog blog={blog} />
    )
  })

  test('renders title', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'DevOps'
    )
  })

  test('renders author', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'A. Korhonen'
    )
  })

  test('renders likes', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'blog has 12 likes'
    )
  })
})

it('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'DevOps',
    author: 'A. Korhonen',
    likes: 12
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})