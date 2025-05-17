import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'

const ViewDetails = () => {

    console.log(useParams())

    const [user, setUser] = useState({}) // empty strong gives the false value // or empty object also give the false value
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const resp = await fetch(`http://localhost:4000/students/${id}`)

                if (resp.ok === true) {
                    const result = await resp.json()
                    setUser(result)
                }

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchedData();

    }, [])

    console.log(user)

    return (
        <div className='view-cont'>
            <h2>Student Detail</h2>
            {user && <div className="details">
                <p><strong>ID: </strong>{user.empId}</p>
                <p><strong>Name: </strong>{user.name}</p>
                <p><strong>Place: </strong>{user.place}</p>
                <p><strong>Phone: </strong>{user.phone}</p>
            </div>}

            {/* <button type='button' onClick={handleHome}>Back</button> */}

            <Link to="/"><button type='button'>Back</button></Link>
        </div>
    )
}

export default ViewDetails
