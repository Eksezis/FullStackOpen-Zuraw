const Courses = ({courses}) => {return(
    <div>
        {courses.map(course => (
        <div key={course.id}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
        </div>
      ))}
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
      <Part key={part.id} part={part}/>
    ))}
    <b>total of {total} exercises</b>
  </div>
)}

const Part = ({part}) => {return(
  <p>{part.name} {part.exercises}</p>
)}

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


  return <Courses courses={courses} />
}

export default App