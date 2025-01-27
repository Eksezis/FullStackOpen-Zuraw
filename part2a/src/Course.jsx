const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        ))}
      </div>
    );
  };
  
  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };
  
  const Content = ({ parts }) => {
    const numberArray = parts.map(part => Number(part.exercises));
    const total = numberArray.reduce((total, array_item) => total + array_item, 0);
  
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
        <b>total of {total} exercises</b>
      </div>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  export default Course;