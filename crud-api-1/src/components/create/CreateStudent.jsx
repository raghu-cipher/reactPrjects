import React, { useEffect, useState } from "react"
import {v4 as uuidv4} from 'uuid';
import './createStudent.css'
import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../../DataStore/DataStore"

export const apiUrl = "http://localhost:8000/students"


const CreateStudent = () => {
    // State to store Form Data 
    const [formData,setFormData] = useState({
        name : '',
        place : '',
        phone : '',
        empId : ''
    })

    // const data = useStore((state) => state.data)
    // stored data import 
    const {data, fetchedData} = useStore()

    // show form errors
    const [errors, setErrors] = useState({})
    const [mouseDown,setMouseDown] = useState(false)

    const navigate = useNavigate()

    const [dataStore,setDataStore] = useState([])

    // console.log(formData.name)
    console.log(data)

    const handleChange = e => {
        const {name,value} = e.target ;
        setFormData(prev => ({
            ...prev,
            [name] : value 
        }));
    }

   
    
    const validateForm = () => {
        const newErrors = {} ;

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

        setErrors(newErrors) ;
        return Object.keys(newErrors).length === 0 ;
    }

    const handleSubmit = async e => {
        e.preventDefault()

        // console.log({formData})
        // if(!formData.id || !formData.name) return ;

        if(!validateForm()) {
            return ; 
        }
        
        const isDuplicateName = data.find((element) => 
            element.name === formData.name 
        )

        // name feild duplication check
        if(isDuplicateName) {
            setErrors((prev) => ({
                ...prev , name : "name already taken"
            }))
            return ; 
        }

        const isDuplicatePhone = data.find((element) => 
            element.phone === formData.phone
        )

        // phone feild duplication check 
       if (isDuplicatePhone) {
        // alert("person data exist")
        setErrors((prev) => ({
            ...prev, phone : "number already taken"
        }))
        return ; 
       } ; 

      
        try{
            const resp = await fetch(apiUrl,{
                method : "POST",
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify({...formData, id : uuidv4()})
            })

            const result = await resp.json()
            if(resp.ok === true) {
                alert("Student data saved Successfully")
                navigate('/')
            }
            console.log('Success:', result);

            //Reset Form 
            setFormData({
                id : "",
                name : '',
                phone : '',
                place : ''
            })

        }catch (error) {
            console.log(error.message)
        }

        // setDataStore((prev) => [...prev,formData])
        
    }

    useEffect(() => {
        fetchedData()
    }, [])

    // console.log(dataStore)

    return (
        <section className="create-cont">
            <div className="create-cont-details">

                <h2>Add New Student</h2>
                <form className="form-cont" onSubmit={handleSubmit}>
                    <label htmlFor="id">EMP ID:</label>
                    <input type="text" name="empId" id="id" placeholder="Enter id"
                           value={formData.empId}
                           required
                           onChange={handleChange} 
                           onMouseOver={() => setErrors((prev) => ({...prev, id : null}))}
                    />
                    {errors.id &&  mouseDown && <span style={{color : "red", margin : "0px"}}>{errors.id}</span> }

                    <label htmlFor="id">Name:</label>
                    <input type="text" name="name" id="id" placeholder="Enter name"
                           value={formData.name}
                           onChange={handleChange} required
                    />
                    {errors.name && <span style={{color : 'red'}}>{errors.name}</span>}

                    <label htmlFor="id">Place:</label>
                    <input type="text" name="place" id="id" placeholder="Enter place"
                           value={formData.place}
                           onChange={handleChange} required
                    />
                    {errors.place && <span style={{color: 'red'}}>{errors.place}</span>}

                    <label htmlFor="id">Phone:</label>
                    <input type="text" name="phone" id="id" placeholder="Enter phone"
                           value={formData.phone}
                           onChange={handleChange} required
                    />
                    {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>}

                    <div>
                        <button type="submit" className="btn btn-save">Save</button>

                        <Link to="/" >
                            <button type="button" className="btn btn-back">Back</button>
                        </Link>
                    </div>


                </form>
            </div>

            
        </section>

    )
}

export default CreateStudent