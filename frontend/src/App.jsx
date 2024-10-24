import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import NewForm from './components/NewForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Form /> */}
      <NewForm/>
    </div>
  )
}

export default App
