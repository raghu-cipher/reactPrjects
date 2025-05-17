import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const apiUrl = "http://localhost:4000/students"



const StudentTable = () => {
    const [studentsData, setStudentsData] = useState(null)
    const navigate = useNavigate()

    const handleView = id => {
        console.log(`Click :${id}`)
        navigate(`view/student/${id}`)
        
    }

    const handleEdit = id => {
        console.log(`Click :${id}`)
        navigate(`/edit/student/${id}`)
    }

    const handleDelete = async id => {
        console.log(`Click : ${id}`)
        if(window.confirm("Are you sure want to delete ? ")) {
            try {
                const resp = await fetch(`http://localhost:4000/students/${id}`, {
                    method: "DELETE"
                    // headers: {
                    //     "Content-Type": 'application/json'
                    // },
                    // body: JSON.stringify(formData)
                })
    
                const result = await resp.json()
    
                console.log(resp.ok)
    
                if (resp.ok === true) {
                    alert("Removed Student Data Successfully")
                    // navigate('/')
                    window.location.reload();
                }
                console.log('Success:', result);
    
                // //Reset Form 
                // setFormData({
                //     id: "",
                //     name: '',
                //     phone: '',
                //     place: ''
                // })
    
            } catch (error) {
                console.log(error.message)
                
            }
        }
    }

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
    console.log(studentsData)
    return (
        <div className='student-main-cont'>
            <div className='student-table-cont'>
                <h2>Student Records</h2>
                <div className='table-cont-main'>
                    <Link to="/create" style={{ textDecoration: "none" }}>
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
                                                    onClick={() => handleView(item.id)}
                                            >view</button>
                                            <button className="btn btn-edit"
                                                    onClick={() => handleEdit(item.id)}
                                            >Edit</button>
                                            <button className="btn btn-delete"
                                                    onClick={() => handleDelete(item.id)}
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
