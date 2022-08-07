import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    async function fetchValues() {
      const res = await axios.get('/api/values/current')
      setValues(res.data)
    }

    async function fetchIndexes() {
      const res = await axios.get('/api/values/all')
      setSeenIndexes(res.data)
    }

    fetchValues()
    fetchIndexes()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('submit')
    await axios.post('/api/values', { index })
    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>EEEnter your index: </label>
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
    </div>
  )
}

export default Fib
