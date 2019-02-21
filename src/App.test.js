import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    const div = component.container.querySelector('.mainpage')
    expect(div).toHaveTextContent('log in to application')
    expect(div).not.toHaveTextContent('blogs')
    expect(div).not.toHaveTextContent('create new')
  })

  it('after logging in, blogs are rendered', async () => {
    const user = {
      username: 'mjl',
      token: '1231231214',
      name: 'Matti'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)
    /*await waitForElement(
      () => component.container.querySelector('.BlogInfo')
    )

    const blogs = component.container.querySelectorAll('.BlogInfo')
    expect(blogs.length).toBe(3)*/

    await waitForElement(
      () => component.getByText('blogs')
    )

    const div = component.container.querySelector('.mainpage')
    expect(div).toHaveTextContent('blogs')
    expect(div).toHaveTextContent('create new')
  })
})