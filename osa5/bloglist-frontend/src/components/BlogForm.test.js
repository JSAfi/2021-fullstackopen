/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('5.16', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, {
    target: { value: 'Boombastic' }
  })
  fireEvent.change(author, {
    target: {  value: 'Shaggy' }
  })
  fireEvent.change(url, {
    target: { value: 'www.google.fi' }
  })

  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('Boombastic')
  expect(createBlog.mock.calls[0][0].author).toBe('Shaggy')
  expect(createBlog.mock.calls[0][0].url).toBe('www.google.fi')
})