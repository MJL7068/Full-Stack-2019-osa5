import React from 'react'
import { render, cleanup, testHook } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders title', () => {
  const blog = {
    title: 'DevOps',
    author: 'A. Korhonen',
    likes: 12
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'DevOps'
  )
})

test('renders author', () => {
  const blog = {
    title: 'DevOps',
    author: 'A. Korhonen',
    likes: 12
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'A. Korhonen'
  )
})

test('renders likes', () => {
  const blog = {
    title: 'DevOps',
    author: 'A. Korhonen',
    likes: 12
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'blog has 12 likes'
  )
})