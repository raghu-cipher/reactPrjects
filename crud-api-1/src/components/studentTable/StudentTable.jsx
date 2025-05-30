import React, { useEffect, useState } from 'react'

import './studenttable.css'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../DataStore/DataStore.jsx'

const apiUrl = "http://localhost:8000/students"

const StudentTable = () => {

    const [studentsData, setStudentsData] = useState(null)
    // const message = useStore((state) => state.message)
    const {data,message,error,setData} = useStore()
    const navigate = useNavigate()

    const displayDetails = (id) => {
        console.log(id)
        navigate(`student/view/${id}`)
    }

    const handleEditDetails = (id) => {
        console.log(id)
        navigate(`student/edit/${id}`)
    }

    // const handleDelete = (id) => {
    //     console.log(id)
    // }

    useEffect(() => {
        fetch(apiUrl).then((resp) => resp.json())
            .then((data) => {
                // console.log(data)
                setStudentsData(data)
                setData(data)
            }).catch((err) => {
                console.log(err.message)
            })
            
    }, [])
    console.log(message)
    console.log(data)
    console.log(error)

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
                                studentsData && studentsData.map((item,index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.place}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <button className="btn btn-view"
                                                    onClick = {() => displayDetails(item.id)}
                                            >view</button>
                                            <button className="btn btn-edit"
                                                    onClick={() => handleEditDetails(item.id)}
                                            >Edit</button>
                                            <button className="btn btn-delete"
                                                    onClick={() => handleDelete(index)}
                                            >Delete</button>
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
