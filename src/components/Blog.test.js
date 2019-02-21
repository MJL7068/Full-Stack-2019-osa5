import React from 'react'
import { render, fireEvent, cleanup, testHook } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

describe('Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'DevOps',
      author: 'A. Korhonen',
      likes: 12,
      url: 'https://devops.com',
      user: {
        username: 'mjl',
        name: 'Matti',
        id: '5c6b2f8dbb4eaf554f47f25d'
      },
    }

    const user = {
      username: 'mjl'
    }

    component = render(
      <Blog user={user} blog={blog} addLike={jest.fn()} removeBlog={jest.fn()} />
    )
  })

  it('at start only title and author are displayed', () => {
    const div = component.container.querySelector('.BlogInfo')
    expect(div).toHaveTextContent('DevOps')
    expect(div).toHaveTextContent('A. Korhonen')
    expect(div).not.toHaveTextContent('12 likes')
  })

  it('after clicking the button, rest of the info is displayed', () => {
    const div = component.container.querySelector('.BlogInfo')
    fireEvent.click(div)
    expect(div).toHaveTextContent('12 likes')
    expect(div).toHaveTextContent('https://devops.com')
  })
})