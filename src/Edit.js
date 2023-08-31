import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
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
        sessionStorage.setItem('preferred_race', user.preferredRace)
        sessionStorage.setItem('preferred_sex', user.preferredSex)
        sessionStorage.setItem('id', user.id)
        navigate(`/${userId}`)
    }

    return (
        <main>
            <NavBar />
            <h1>Edit Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='userName'>Username</label>
                    <input required value={user.userName} name='userName' id='userName' onChange={e => setUser({...user, userName: e.target.value})} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input required value={user.email} name='email' id='email' onChange={e => setUser({...user, email: e.target.value})} />
                </div>
                <div>
                    <label htmlFor='pass'>Password</label>
                    <input required value={user.pass} name='pass' id='pass' onChange={e => setUser({...user, pass: e.target.value})} />
                </div>
                <div>
                    <label htmlFor='profilepic'>Profile Picture</label>
                    <input required value={user.profilepic} name='profilepic' id='profilepic' onChange={e => setUser({...user, profilepic: e.target.value})} />
                </div>
                <div>
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
                <div>
                    <h5>Your Sex</h5>
                    <input type='radio' id='man' name='user_sex' value='Man' onClick={e => setUser({...user, userSex: 'Man'})} />
                    <label htmlFor='man'>Man</label>
                    <input type='radio' id='woman' name='user_sex' value='Woman' onClick={e => setUser({...user, userSex: 'Woman'})} />
                    <label htmlFor='woman'>Woman</label>
                </div>
                <div>
                    <h5>Which race(s), if any, do you prefer?</h5>
                    <input type='checkbox' id='asian' name='preferred_race' value='Asian' onClick={e => user.preferredRace.push('Asian')} />
                    <input type='checkbox' id='white' name='preferred_race' value='White' onClick={e => user.preferredRace.push('White')} />
                    <input type='checkbox' id='hispanic' name='preferred_race' value='Hispanic' onClick={e => user.preferredRace.push('Hispanic')} />
                    <input type='checkbox' id='native american' name='preferred_race' value='Native American' onClick={e => user.preferredRace.push('Native American')} />
                    <input type='checkbox' id='black' name='preferred_race' value='Black' onClick={e => user.preferredRace.push('Black')} />
                    <input type='checkbox' id='mixed race/other' name='preferred_race' onClick={e => user.preferredRace.push('Mixed Race/Other')} />
                    <input type='checkbox' id='no preference' name='preferred_race' value='No preference' onClick={e => user.preferredRace.push('No preference')} />
                </div>
                <div>
                    <h5>Are you seeking a:</h5>
                    <input type='radio' id='man' name='preferred_sex' value='Man' onClick={e => setUser({...user, preferredSex: 'Man'})} />
                    <label htmlFor='man'>Man</label>
                    <input type='radio' id='woman' name='preferred_sex' value='Woman' onClick={e => setUser({...user, preferredSex: 'Woman'})} />
                    <label htmlFor='woman'>Woman</label>
                    <input type='radio' id='no preference' name='preferred_sex' value='No preference' onClick={e => setUser({...user, preferredSex: 'No preference'})} />
                    <label htmlFor='no preference'>No preference</label>
                </div>
                <div>
                    <input type='submit' value='Save Changes' />
                </div>
            </form>
        </main>
    )
}

export default Edit