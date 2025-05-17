import React from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useStore } from '../../DataStore/dataStore'

const apiUrl = "http://localhost:4000/students"

const EditStudent = () => {

    // State to store Form Data 
    const [formData, setFormData] = useState({
        name: '',
        place: '',
        phone: '',
        empId: ''
    })

    const [userData, setUserData] = useState(null)

    // show form errors
    const [errors, setErrors] = useState({})

     const navigate = useNavigate()

   
     const {message,data,fetchData} = useStore()

    // console.log(useParams())
    const {id} = useParams()
    // console.log(id)

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const validateForm = () => {
        const newErrors = {};

        // ID validate 

        if (!formData.empId.trim()) {
            newErrors.empId = "ID is required"

        } else if (isNaN(formData.empId)) {
            newErrors.empId = "ID must be a number"
        }

        // Name Validation 
        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        //Phone Feild validation

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required"
        } else if (isNaN(formData.phone)) {
            newErrors.phone = "Must be a number"
        } else if (formData.phone.length !== 10) {
            newErrors.phone = "required ten digits"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async e => {
        e.preventDefault()

        // console.log({formData})
        // if(!formData.id || !formData.name) return ;

        if (!validateForm()) {
            return;
        }

        const isDuplicateName = data.find((element) =>
            element.name === formData.name
        )

        // name feild duplication check
        if (isDuplicateName) {
            setErrors((prev) => ({
                ...prev, name: "name already taken"
            }))
            return;
        }

        const isDuplicatePhone = data.find((element) =>
            element.phone === formData.phone
        )

        // phone feild duplication check 
        if (isDuplicatePhone) {
            // alert("person data exist")
            setErrors((prev) => ({
                ...prev, phone: "number already taken"
            }))
            return;
        };


        try {
            const resp = await fetch(`http://localhost:4000/students/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await resp.json()

            console.log(resp.ok)

            if (resp.ok === true) {
                alert("Student updated Successfully")
                navigate('/')
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

        // setDataStore((prev) => [...prev,formData])

    }

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const resp = await fetch(`${apiUrl}/${id}`)
                const result = await resp.json()
                setUserData(result)
                setFormData(result)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchedData();
        fetchData();
    }, [])

    // console.log(userData)
    // console.log(formData.name)
    

    return (
        <section className="create-cont">
            <div className="create-cont-details">

                <h2>Edit Student</h2>
                <form className="form-cont" onSubmit={handleSubmit}>
                    <label htmlFor="id">EMP ID:</label><br />
                    <input type="text" name="empId" id="id" placeholder="Enter id"
                        value={formData.empId}
                        required
                        onChange={handleChange}
                        onMouseOver={() => setErrors((prev) => ({ ...prev, id: null }))}
                    /><br /><br />
                    {errors.id && mouseDown && <span style={{ color: "red", margin: "0px" }}>{errors.id}</span>}

                    <label htmlFor="id">Name:</label><br />
                    <input type="text" name="name" id="id" placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange} required
                    /><br /><br />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

                    <label htmlFor="id">Place:</label><br />
                    <input type="text" name="place" id="id" placeholder="Enter place"
                        value={formData.place}
                        onChange={handleChange} required
                    /><br /><br />
                    {errors.place && <span style={{ color: 'red' }}>{errors.place}</span>}

                    <label htmlFor="id">Phone:</label><br />
                    <input type="text" name="phone" id="id" placeholder="Enter phone"
                        value={formData.phone}
                        onChange={handleChange} required
                    /><br /><br />
                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

                    <div>
                        <button type="submit" className="btn btn-save">Update</button>

                        <Link to="/" >
                            <button type="button" className="btn btn-back">Back</button>
                        </Link>
                    </div>


                </form>
            </div>


        </section>
    )
}

export default EditStudent
