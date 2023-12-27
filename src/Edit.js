import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

function Edit() {
    const navigate = useNavigate()

    const userId = useParams()

    const[user, setUser] = useState({
        userName: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        pass: sessionStorage.getItem('pass'),
        profilepic: sessionStorage.getItem('profilepic'),
        userRace: sessionStorage.getItem('user_race'),
        userSex: sessionStorage.getItem('user_sex'),
        preferredRace: sessionStorage.getItem('preferred_race'),
        preferredSex: sessionStorage.getItem('preferred_sex'),
        id: sessionStorage.getItem('id')
    })

    const [preferredRace, setPreferredRace] = useState(
        new Array(7).fill(false)
    )

    const handleChange = (position) => {
        const updatedPreferredRace = preferredRace.map((item, index) => 
            index === position ? !item : item
        )

        setPreferredRace(updatedPreferredRace)
    }

    async function handleSubmit(e){
        e.preventDefault()
        await fetch(`https://my-perfect-date.herokuapp.com/users/${user.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        sessionStorage.setItem('username', user.userName)
        sessionStorage.setItem('email', user.email)
        sessionStorage.setItem('pass', user.pass)
        sessionStorage.setItem('profilepic', user.profilepic)
        sessionStorage.setItem('user_race', user.userRace)
        sessionStorage.setItem('user_sex', user.userSex)
        sessionStorage.setItem('preferred_race', preferredRace)
        sessionStorage.setItem('preferred_sex', user.preferredSex)
        sessionStorage.setItem('id', user.id)
        navigate(`/${userId}`)
    }

    return (
        <main className='edit-page'>
            <NavBar />
            <h1>Edit Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-div'>
                    <label htmlFor='userName'>Username</label>
                    <input required value={user.userName} name='userName' id='userName' onChange={e => setUser({...user, userName: e.target.value})} />
                </div>
                <div className='form-div'>
                    <label htmlFor='email'>Email</label>
                    <input required value={user.email} name='email' id='email' onChange={e => setUser({...user, email: e.target.value})} />
                </div>
                <div className='form-div'>
                    <label htmlFor='pass'>Password</label>
                    <input required value={user.pass} name='pass' id='pass' onChange={e => setUser({...user, pass: e.target.value})} />
                </div>
                <div className='form-div'>
                    <label htmlFor='profilepic'>Profile Picture</label>
                    <input required value={user.profilepic} name='profilepic' id='profilepic' onChange={e => setUser({...user, profilepic: e.target.value})} />
                </div>
                <div className='form-div'>
                    <h5>Your Race</h5>
                    <input type='radio' id='asian' name='user_race' value='Asian' onClick={e => setUser({...user, userRace: 'Asian'})} />
                    <label htmlFor='asian'>Asian</label>
                    <input type='radio' id='white' name='user_race' value='White' onClick={e => setUser({...user, userRace: 'White'})} />
                    <label htmlFor='white'>White</label>
                    <input type='radio' id='hispanic' name='user_race' value='Hispanic' onClick={e => setUser({...user, userRace: 'Hispanic'})} />
                    <label htmlFor='hispanic'>Hispanic</label>
                    <input type='radio' id='native american' name='user_race' value='Native American' onClick={e => setUser({...user, userRace: 'Native American'})} />
                    <label htmlFor='native american'>Native American</label>
                    <input type='radio' id='black' name='user_race' value='Black' onClick={e => setUser({...user, userRace: 'Black'})} />
                    <label htmlFor='black'>Black</label>
                    <input type='radio' id='mixed race/other' name='user_race' value='Mixed Race/Other' onClick={e => setUser({...user, userRace: 'Mixed Race/Other'})} />
                    <label htmlFor='mixed race/other'>Mixed Race/Other</label>
                </div>
                <div className='form-div'>
                    <h5>Your Sex</h5>
                    <input type='radio' id='man' name='user_sex' value='Man' onClick={e => setUser({...user, userSex: 'Man'})} />
                    <label htmlFor='man'>Man</label>
                    <input type='radio' id='woman' name='user_sex' value='Woman' onClick={e => setUser({...user, userSex: 'Woman'})} />
                    <label htmlFor='woman'>Woman</label>
                </div>
                <div className='form-div'>
                    <h5>Which race(s), if any, do you prefer?</h5>
                    <input type='checkbox' id='asian' name='preferred_race' value='Asian' checked={preferredRace[0]} onChange={() => handleChange(0)} />
                    <label htmlFor='Asian'>Asian</label>
                    <input type='checkbox' id='white' name='preferred_race' value='White' checked={preferredRace[1]} onChange={() => handleChange(1)} />
                    <label htmlFor='White'>White</label>
                    <input type='checkbox' id='hispanic' name='preferred_race' value='Hispanic' checked={preferredRace[2]} onChange={() => handleChange(2)} />
                    <label htmlFor='Hispanic'>Hispanic</label>
                    <input type='checkbox' id='native_american' name='preferred_race' value='Native American' checked={preferredRace[3]} onChange={() => handleChange(3)} />
                    <label htmlFor='Native American'>Native American</label>
                    <input type='checkbox' id='black' name='preferred_race' value='Black' checked={preferredRace[4]} onChange={() => handleChange(4)} />
                    <label htmlFor='Black'>Black</label>
                    <input type='checkbox' id='mixed_race/other' name='preferred_race' value='Mixed Race/Other' checked={preferredRace[5]} onChange={() => handleChange(5)} />
                    <label htmlFor='Mixed Race/Other'>Mixed Race/Other</label>
                    <input type='checkbox' id='no_race_preference' name='preferred_race' value='No preference' checked={preferredRace[6]} onChange={() => handleChange(6)} />
                    <label htmlFor='No preference'>No preference</label>
                </div>
                <div className='form-div'>
                    <h5>Are you seeking a:</h5>
                    <input type='radio' id='man' name='preferred_sex' value='Man' onClick={e => setUser({...user, preferredSex: 'Man'})} />
                    <label htmlFor='man'>Man</label>
                    <input type='radio' id='woman' name='preferred_sex' value='Woman' onClick={e => setUser({...user, preferredSex: 'Woman'})} />
                    <label htmlFor='woman'>Woman</label>
                    <input type='radio' id='no_sex_preference' name='preferred_sex' value='No preference' onClick={e => setUser({...user, preferredSex: 'No preference'})} />
                    <label htmlFor='no preference'>No preference</label>
                </div>
                <div className='form-div'>
                    <input type='submit' value='Save Changes' className='edit-button' />
                </div>
            </form>
        </main>
    )
}

export default Edit