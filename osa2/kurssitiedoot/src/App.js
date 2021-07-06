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

const Total = ({parts}) => {
  return (
    <p>
      <b>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
    </p>
  )
}

const OneCourse = ({course}) => {
    return (
     <div>
      <Header course={course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>      
    )
}

const Course = ({courses}) => {
  return (
    <>
      {courses.map((crs)=> (
        <OneCourse course={crs} key={crs.id} />
      ))}
    </>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (      
    <Course courses={courses} />
  )
}

export default App