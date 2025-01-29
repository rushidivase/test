import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EmployeeListComponent() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees();
    }, []);


    const getEmployees = async () => {
        let result = await fetch('http://localhost:8088/emp-service/');
        result = await result.json();
        setEmployees(result);
    };

    const deleteEmployee = async (eid) => {

        let result = await fetch('http://localhost:8088/emp-service/' + eid, {
            method: 'DELETE'
        });

        result = await result.json();
        console.log(result);
        if(result){
            alert('Employee deleted successfully');
            getEmployees(); 
        }
 
    }

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='card col-md-8 offset-2 p-3 shadow'>
                    <h1 className='fs-2 lead text-center'>Employee List Component</h1>
                    <table className='table table-bordered table-striped table-hover table-light'>
                        <thead>
                            <tr>
                                <th>Eid</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th>Mobile</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(employee =>
                                    <tr>
                                        <td>{employee.eid}</td>
                                        <td>{employee.ename}</td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.age}</td>
                                        <td>{employee.mono}</td>
                                        <td>
                                            <button className='btn btn-success' 
                                            onClick={()=>(navigate('/update-emp/'+employee.eid))}
                                            >Update</button>
                                            <button onClick={()=>deleteEmployee(employee.eid)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    <button onClick={()=>(navigate('/add-emp'))} className='btn btn-primary w-100'>Add Employee</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeListComponent