import { useState } from 'react'
const Title = (props)=>{ return(<h1>{props.title}</h1>)}
const Total = (props)=>{ return(<p>{props.name} {props.number}</p>) }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const titles = {
    first: 'give feedback',
    second:'statistic'
  }
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title={titles.first} />
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Title title={titles.second} />
      <Total name="good" number={good}/>
      <Total name="neutral" number={neutral}/>
      <Total name="bad" number={bad}/>
    </div>
  )
}

export default App