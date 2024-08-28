import React, { useState } from "react";
import { registerUser } from "../utils/api";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await registerUser(formData)
            setMessage('Registration successful! You can now log in')
        } catch (error) {
            setMessage('Error during registration. Please try again.')
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Register