import React, { useEffect, useState } from 'react'
import './studenttable.css'
import { Link } from 'react-router-dom'

const apiUrl = "http://localhost:8000/students"

const StudentTable = () => {

    const [studentsData, setStudentsData] = useState("")

    useEffect(() => {
        fetch(apiUrl).then((resp) => resp.json())
            .then((data) => {
                // console.log(data)
                setStudentsData(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [])

    return (
        <div className='student-main-cont'>
            <div className='student-table-cont'>
                <h2>Student Records</h2>
                <div className='table-cont-main'>
                    <Link to="/student/create" style={{ textDecoration: "none" }}>
                        <button className='btn add-btn'>Add New Student</button>
                    </Link>

                    <table className='table-cont'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Place</th>
                                <th>Phone</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                studentsData && studentsData.map((item,i) => (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.place}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <button className="btn btn-view">view</button>
                                            <button className="btn btn-edit">Edit</button>
                                            <button className="btn btn-delete">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default StudentTable
