import { useState } from 'react'
const Title = (props)=>{ return(<h1>{props.title}</h1>)}
const StatisticLine = (props)=>{ return(<p>{props.name} {props.value}</p>) }
const Statistics = (props)=>{ 
  return(<div>
    <StatisticLine name="good" value={props.good}/>
    <StatisticLine name="neutral" value={props.neutral}/>
    <StatisticLine name="bad" value={props.bad}/>
    <StatisticLine name="all" value={props.all}/>
    <StatisticLine name="average" value={(props.good*1+props.bad*-1)/props.all} />
    <StatisticLine name="positive" value={(props.good/props.all)*100+"%"} />
  </div>)
}
const Feedback = (props)=>{
  if (props.all!=0) {
    return (
      <div>
        <Statistics good={props.good} neutral={props.neutral} bad={props.bad} all={props.all}/>
      </div>
    )
  }
  else{
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
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
      <Feedback all={all} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App