import React from 'react'

const Header = (props) => {
  return (
    <>
    <h1>
      {props.course.name}
    </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.parts.parts[0]}/>
      <Part part = {props.parts.parts[1]}/>
      <Part part = {props.parts.parts[2]}/>
    </>
  )
}

const Course = () => {
  return (
    <p></p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App