import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {

    let auth = localStorage.getItem("user");
    const navigator = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigator("/register-user");
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>Employees</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {auth ?
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/"}>Employees</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/add-emp"}>Add Employee</NavLink>
                            </li>
                            <li>
                                <Link className='nav-link' onClick={logout} to={"/register-user"}>Logout</Link>
                            </li>
                        </ul>
                        :
                        <ul className='navbar-nav'>
                            <li><Link to="/register-user" className='nav-link'>Sign Up</Link></li>
                            <li><Link to="/login" className='nav-link'>Login</Link></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar