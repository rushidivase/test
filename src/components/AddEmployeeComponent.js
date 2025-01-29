import React, { useEffect, useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function AddEmployeeComponent() {

    const [eid, setEid] = useState();
    const [ename, setEname] = useState('');
    const [salary, setSalary] = useState();
    const [age, setAge] = useState();
    const [mono, setMono] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getEmployee();
    }, [id])

    const getEmployee = async () => {
        let result = await fetch('http://localhost:8088/emp-service/' + id, {
            method: 'GET',
        });
        result = await result.json();
        setEid(result.eid);
        setEname(result.ename);
        setAge(result.age);
        setSalary(result.salary);
        setMono(result.mono);
    }

    const saveOrUpdateEmployee = async (e) => {
        e.preventDefault();
        const employee = { eid, ename, salary, age, mono };
        if (id) {
            let result = await fetch('http://localhost:8088/emp-service/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });

            result = await result.json();
            console.log(result);

            if (result) {
                navigate('/');
            } else {
                alert('Failed to Update employee');
            }
        }
        else {

            let result = await fetch('http://localhost:8088/emp-service/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });

            result = await result.json();
            console.log(result);

            if (result) {
                navigate('/');
            } else {
                alert('Failed to add employee');
            }
        }

    }

    function title() {
        if (id) {
            return <h1 className='fs-2 lead text-center'>Update Employee</h1>
        }
        else {
            return <h1 className='fs-2 lead text-center'>Add Employee</h1>

        }
    }
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3 p-3 shadow'>
                    {
                        title()
                    }
                    <form>
                        <div>
                            <input type="text" value={eid} placeholder='Enter Eid' onChange={(e) => setEid(e.target.value)} className='form-control' />
                        </div>
                        <div>

                            <input type="text" value={ename}
                                onChange={(e) => setEname(e.target.value)} placeholder='Enter Name' className='form-control mt-2' />
                        </div>
                        <div>

                            <input type="text" value={salary} placeholder='Enter Salary' onChange={(e) => setSalary(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div>

                            <input type="text" value={age} placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} className='form-control' />
                        </div>
                        <div>

                            <input type="text" value={mono} placeholder='Enter Mobile Number' onChange={(e) => setMono(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div>
                            <button type="submit" className='btn btn-success w-100' onClick={saveOrUpdateEmployee}>Submit</button>
                        </div>
                    </form>
                </div>
        
            </div>
        </div>
    )
}

export default AddEmployeeComponent;