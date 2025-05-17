import React from 'react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const apiUrl = "http://localhost:8000/students"

const EditStudent = () => {

  // State to store Form Data 
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    phone: '',
    empId: ''
  })

  const { id } = useParams()
  console.log(id)

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // }


  const handleSubmit = async e => {
    e.preventDefault()

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

    // try{
    //         const resp = await fetch(`http://localhost:8000/students/${id}`,{
    //             method : "PUT",
    //             headers : {
    //                 "Content-Type" : 'application/json'
    //             },
    //             body : JSON.stringify(formData)
    //         })

    //         const result = await resp.json()
    //         if(resp.ok === true) {
    //             alert("Student data Updated Successfully")
    //             navigate('/')
    //         }
    //         console.log('Success:', result);

    //         // //Reset Form 
    //         // setFormData({
    //         //     id : "",
    //         //     name : '',
    //         //     phone : '',
    //         //     place : ''
    //         // })

    //     }catch (error) {
    //         console.log(error.message)
    //     }


  }

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const resp = await fetch(`http://localhost:8000/students/${id}`)

        if (resp.ok === true) {
          const result = await resp.json()
          setFormData(result)
        }

      } catch (error) {
        console.log(error.message)
      }
    }

    fetchedData();

  }, [])

  console.log(formData)

  return (
    <section className="create-cont">
      <div className="create-cont-details">

        <h2>Edit Student</h2>
        <form className="form-cont" onSubmit={handleSubmit}>
          <label htmlFor="id">EMP ID:</label>
          <input type="text" name="empId" id="id" placeholder="Enter id"
            value={formData.empId}
            required
            onChange={handleChange}

          />
          {/* {errors.id &&  mouseDown && <span style={{color : "red", margin : "0px"}}>{errors.id}</span> } */}

          <label htmlFor="id">Name:</label>
          <input type="text" name="name" id="id" placeholder="Enter name"
            value={formData.name}
            onChange={handleChange} required
          />
          {/* {errors.name && <span style={{color : 'red'}}>{errors.name}</span>} */}

          <label htmlFor="id">Place:</label>
          <input type="text" name="place" id="id" placeholder="Enter place"
            value={formData.place}
            onChange={handleChange} required
          />
          {/* {errors.place && <span style={{color: 'red'}}>{errors.place}</span>} */}

          <label htmlFor="id">Phone:</label>
          <input type="text" name="phone" id="id" placeholder="Enter phone"
            value={formData.phone}
            onChange={handleChange} required
          />
          {/* {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>} */}

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
