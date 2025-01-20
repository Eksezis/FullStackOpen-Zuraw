const Course = ({course}) => {return(
  <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
  </div>
)}

const Header = ({name}) => {return(
  <h1>{name}</h1>
)}

const Content = ({parts}) => {
  const numberArray = parts.map(part => Number(part.exercises))
  const total = numberArray.reduce((total, array_item) => total + array_item, 0)
  return(
  <div>
    {parts.map(part => (
      <Part part={part}/>
    ))}
    <b>total of {total} exercises</b>
  </div>
)}

const Part = ({part}) => {return(
  <p>{part.name} {part.exercises}</p>
)}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />
}

export default App