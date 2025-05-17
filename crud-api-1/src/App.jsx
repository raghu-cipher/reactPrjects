import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import StudentTable from './components/studentTable/StudentTable'
import CreateStudent from './components/create/CreateStudent'
import EditStudent from './components/editStudent/EditStudent'
import ViewDetails from './components/viewDetails/ViewDetails'

const App = () => {
    return (
        <div className='main-cont'>
            <Routes>
                <Route exact path="/" element={<StudentTable />}></Route>
                <Route exact path ="/student/create" element={<CreateStudent/>} ></Route>
                <Route exact path = "/student/edit/:id" element={<EditStudent />} ></Route>
                <Route exact path = "/student/view/:id" element = {<ViewDetails />} ></Route>
            </Routes>
        </div>
    )
}

export default App
