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

  export default Course