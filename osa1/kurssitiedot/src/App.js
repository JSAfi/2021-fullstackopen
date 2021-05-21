
import React from 'react'

const Header = (props) => {
  return (
    <>
    <h1>
      {props.course}
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
      <Part part = {props.p1}/>
      <Part part = {props.p2}/>
      <Part part = {props.p3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
     <p>
        Number of exercises {props.exerc1.exercises + props.exerc2.exercises + props.exerc3.exercises}
      </p>
    </>
  )
}

const App = () => {
/*  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14 */

  const course = "Half Stack application development"
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3}/>
      <Total exerc1 = {part1} exerc2 = {part2} exerc3 = {part3}/>
    </div>
  )
}
//       <Total exerc1 = {exercises1} exerc2 = {exercises2} exerc3 = {exercises3}/> 
export default App