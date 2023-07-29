import React, { useState } from 'react'
import useNavigate from 'react-router'
import NavBar from './NavBar'

function Login () {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        userName: '',
        email: '',
        pass: '',
        profilepic: '',
        userRace: '',
        userSex: '',
        preferredSex: '',
        id: ''
    })

    const [credentials, setCredentials] = useState({
        email: '',
        pass: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch(`https://localhost:4000/authentication/${credentials.email}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        if(response.status === 200){
            setUser(data)
            sessionStorage.setItem('username', data.userName)
            sessionStorage.setItem('email', data.email)
            sessionStorage.setItem('pass', data.pass)
            sessionStorage.setItem('profilepic', data.profilepic)
            sessionStorage.setItem('user_race', data.userRace)
            sessionStorage.setItem('user_sex', data.userSex)
            sessionStorage.setItem('preferred_sex', data.preferredSex)
            sessionStorage.setItem('id', data.id)
            navigate('/')
        } else{
            setErrorMessage(data.message)
        }
    }

    return (
        <div className='login'>
            <NavBar />
            <h1>Log In</h1>
            {errorMessage !== null? (<div className='danger' role='alert'>{errorMessage}</div>) : null}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' required value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})} name='email' id='email' />
                </div>
                <div>
                    <label htmlFor='pass'></label>
                    <input type="password" required value={credentials.pass} onChange={e => setCredentials({...credentials, pass: e.target.value})} name='pass' id='pass' />
                </div>
                <div>
                    <input type='submit' value='Log In' />
                </div>
            </form>
        </div>
    )
}

export default Login