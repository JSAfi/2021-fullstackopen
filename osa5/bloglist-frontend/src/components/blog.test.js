/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const testBlog = {
    title: 'Boombastic',
    author: 'Shaggy',
    likes: 100000,
    url: 'www.github.com'
  }

  const mockDelBlog = () => {
    return null
  }
  const mockUpdateLikes = () => {
    return 100001
  }
  const user = {
    id: '614766bfa8eab24220e6d09a'
  }

  const component = render(
    <Blog blog = {testBlog} delBlog={mockDelBlog} updateLikes={mockUpdateLikes} user={user}/>
  )

  const element = component.getByText(
    'Boombastic Shaggy'
  )
  expect(element).toBeDefined()

  expect(component.container).not.toHaveTextContent('100000')
  expect(component.container).not.toHaveTextContent('www.github.com')
  expect(component.container).not.toHaveTextContent('614766bfa8eab24220e6d09a')
})

test('display url and likes after button press', () => {
  const mockUser = {
    id: '614766bfa8eab24220e6d09a',
    name: 'Muzzy'
  }
  const testBlog = {
    title: 'Boombastic',
    author: 'Shaggy',
    likes: 100000,
    url: 'www.github.com',
    user: mockUser
  }

  const mockDelBlog = () => {
    return null
  }
  const mockUpdateLikes = () => {
    return 100001
  }

  const component = render(
    <Blog blog = {testBlog} delBlog={mockDelBlog} updateLikes={mockUpdateLikes} user={mockUser}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const elementTitle = component.getByText(
    'Boombastic'
  )
  expect(elementTitle).toBeDefined()

  const elementAuthor = component.getByText(
    'Shaggy'
  )
  expect(elementAuthor).toBeDefined()

  expect(component.container).toHaveTextContent('100000')
  expect(component.container).toHaveTextContent('www.github.com')
})

test('adding likes', () => {
  const mockUser = {
    id: '614766bfa8eab24220e6d09a',
    name: 'Muzzy'
  }
  const testBlog = {
    title: 'Boombastic',
    author: 'Shaggy',
    likes: 100000,
    url: 'www.github.com',
    user: mockUser
  }

  const mockDelBlog = () => {
    return null
  }

  const mockLikeHandler = jest.fn()

  const component = render(
    <Blog blog = {testBlog} delBlog={mockDelBlog} updateLikes={mockLikeHandler} user={mockUser}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)

})