import React, { useState } from 'react'
import { loginUser } from '../utils/api'

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        pssword: '',
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(credentials)
            setMessage('Login successful')
            //Hnadle storing token and redirecting the user
        } catch (error) {
            setMessage('Invalid login credentials. Please try again')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                      type='password'
                      name='password'
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Login
