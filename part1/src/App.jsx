import { useState } from 'react'
const Title = (props)=>{return(<h1>{props.title}</h1>)}
const Line = (props)=>{return(<p>{props.line}</p>)}
const VoteLine = (props)=>{return(<p>has {props.line} votes</p>)}
const Buttons = (props)=>{return(<p>
<button onClick={props.voting}>vote</button>
<button onClick={props.changing}>next anecdote</button>
</p>)}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(new Array(anecdotes.length).fill(0))
  const changeAnectode = () => {  
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  const addVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoint(newPoints)
  }
  return (
    <div>
      <Title title="Anectode of the day" />
      <Line line={anecdotes[selected]} />
      <VoteLine line={points[selected]} />
      <Buttons voting={addVote} changing={changeAnectode} />
      <Title title="Anectode with the most votes"/>
      <Line line={anecdotes[points.indexOf(Math.max(...points))]} />
      <VoteLine line={points[points.indexOf(Math.max(...points))]} />
    </div>
  )
}
export default App