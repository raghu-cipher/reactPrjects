import React from "react"
import './createStudent.css'

const CreateStudent = () => {
    return (
        <section className="create-cont">
            <div className="create-cont-details">
             <h2>Add New Student</h2>
             <form className="form-cont">
                <label htmlFor="id">ID:</label>
                <input type="text" name="id" id="id" />

                <label htmlFor="id">Name:</label>
                <input type="text" name="name" id="id" />

                <label htmlFor="id">Place:</label>
                <input type="text" name="place" id="id" />

                <label htmlFor="id">Phone:</label>
                <input type="text" name="phone" id="id" />
             </form>
        </div>
        </section>
        
    )
}

export default CreateStudent