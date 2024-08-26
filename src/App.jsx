import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Game from './components/Game'
import GenerateKeypair from './components/keys'

function App() {
  return (
    <main className="bg-stone-800 h-screen ">
<Routes>
  <Route path="/" element={<Game/>}/>

</Routes>

    </main>
      
   
  )
}

export default App
