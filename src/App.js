import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddEmployeeComponent from './components/AddEmployeeComponent'
import EmployeeListComponent from './components/EmployeeListComponent'
import Navbar from './components/Navbar'
import UserRegister from './components/UserRegister'
import Login from './components/Login'
import PrivateComponent from './components/PrivateComponent'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<EmployeeListComponent />} />
            <Route path="/add-emp" element={<AddEmployeeComponent />} />
            <Route path="/update-emp/:id" element={<AddEmployeeComponent />} />
          </Route>
          
          <Route path='/login' element={<Login />} />
          <Route path='/register-user' element={<UserRegister />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App