import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  async function fetchValues() {
    const res = await axios.get('/api/values/current')
    setValues(res.data)
  }

  async function fetchIndexes() {
    const res = await axios.get('/api/values/all')
    setSeenIndexes(res.data)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
    console.log('useEffect!')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    await axios.post('/api/values', { index })
    setIndex('')
    fetchValues()
    fetchIndexes()
  }

  function handleRefresh() {
    fetchValues()
    fetchIndexes()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input value={index} onChange={(e) => { setIndex(e.target.value) }} />
        <button>submit</button>
      </form>
      <h3>
        Indexes I have seen:
      </h3>
      {seenIndexes.map((i) => i.number).join(', ')}

      <h3>
        Calculated Values:
      </h3>
      {Object.keys(values).map((key) => {
        return (
          <div>
            For index {key} | calculated {values[key]}
          </div>
        )
      })}

      <p></p>
      <button onClick={handleRefresh}>refresh</button>
    </div>
  )
}

export default Fib
