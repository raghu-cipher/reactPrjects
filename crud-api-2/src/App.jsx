import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import StudentTable from './components/StudentTable/StudentTable'
import Create from './components/create/Create'
import ViewDetails from './components/ViewDetails/ViewDetails'
import EditStudent from './components/EditStudent/EditStudent'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<StudentTable/>}></Route>
        <Route exact path="/create" element={<Create/>}></Route>
        <Route exact path="/view/student/:id" element={<ViewDetails/>}></Route>
        <Route exact path="/edit/student/:id" element={<EditStudent/>}></Route>
      </Routes>
    </>
  )
}

export default App
