import { useState } from 'react'
const Title = (props)=>{ return(<h1>{props.title}</h1>)}
const Total = (props)=>{ return(<p>{props.name} {props.number}</p>) }
const Statistics = (props)=>{ 
  return(<div>
    <Total name="good" number={props.good}/>
    <Total name="neutral" number={props.neutral}/>
    <Total name="bad" number={props.bad}/>
    <Total name="all" number={props.all}/>
    <Total name="average" number={(props.good*1+props.bad*-1)/props.all} />
    <Total name="positive" number={(props.good/props.all)*100+"%"} />
  </div>)
 }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const titles = {
    first: 'give feedback',
    second:'statistic'
  }
  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
  }
  

  return (
    <div>
      <Title title={titles.first} />
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Title title={titles.second} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App