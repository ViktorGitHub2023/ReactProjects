import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import List from './components/List'


export default function App() {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/velemenyek')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <div>
      <h1>Vélemények</h1>
      <Form onSaved={fetchItems} />
      <List items={items} />
    </div>
  )
}
