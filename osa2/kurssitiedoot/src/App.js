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
        {props.name} {props.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(note =>
        <Part name={note.name} exercises={note.exercises} key={note.id}/>
        )}
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts = {course.parts} />
    </div>      
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
    <Course course={course} />
  )
}

export default App