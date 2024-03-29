import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

function Signup() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        userName: '',
        email: '',
        pass: '',
        profilepic: '',
        userRace: '',
        userSex: '',
        preferredRace: [false, false, false, false, false, false, false],
        preferredSex: '',
        goal: '',
        values: '',
        desires1: 5,
        desires2: 5,
        desires3: 5,
        desires4: 5,
        desires5: 5,
        desires6: 5,
        attributes1: 5,
        attributes2: 5,
        attributes3: 5,
        attributes4: 5,
        attributes5: 5,
        attributes6: 5,
    })

    async function handleSubmit(e) {
        e.preventDefault()
        await fetch(`https://localhost:4000/users`, {
            method: 'POST',
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
        navigate('/')
    }

    const handleChange = (position) => {
        const updatedPreferredRace = user.preferredRace.map((item, index) => 
            index === position ? !item : item
        )

        setUser({...user, preferredRace: updatedPreferredRace})
    }

    return (
        <div className='signup'>
            <NavBar />
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='userName'>Username</label>
                    <input required value={user.userName} onChange={e => setUser({...user, userName: e.target.value})} id='username' name='username' />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input required value={user.email} onChange={e => setUser({...user, email: e.target.value})} id='email' name='email' />
                </div>
                <div>
                    <label htmlFor='pass'>Password</label>
                    <input required value={user.pass} onChange={e => setUser({...user, pass: e.target.value})} id='pass' name='pass' />
                </div>
                <div>
                    <label htmlFor='profilepic'>Profile Picture</label>
                    <input value={user.profilepic} onChange={e => setUser({...user, profilepic: e.target.value})} id='profilepic' name='profilepic' />
                </div>
                <div>
                    <label htmlFor='user_race'>What race are you?</label>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'Asian'})}>Asian</input>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'White'})}>White</input>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'Hispanic'})}>Hispanic</input>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'Native American'})}>Native American</input>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'Black'})}>Black</input>
                    <input type='radio' name='user_race' value={user.userRace} onClick={setUser({...user, userRace: 'Mixed race/Other'})}>Mixed race/Other</input>
                </div>
                <div>
                    <label htmlFor='user_sex'>Are you a man or a woman?</label>
                    <input type='radio' name='user_sex' value={user.userSex} onClick={setUser({...user, userSex: 'Man'})}>Man</input>
                    <input type='radio' name='user_sex' value={user.userSex} onClick={setUser({...user, userSex: 'Woman'})}>Woman</input>
                </div>
                <div>
                    <label htmlFor='preferred_race'>Which race(s), if any, do you prefer?</label>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(0)} checked={user.preferredRace[0]}>Asian</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(1)} checked={user.preferredRace[1]}>White</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(2)} checked={user.preferredRace[2]}>Hispanic</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(3)} checked={user.preferredRace[3]}>Native American</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(4)} checked={user.preferredRace[4]}>Black</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(5)} checked={user.preferredRace[5]}>Mixed Race/Other</input>
                    <input type='checkbox' name='preferred_race'  onClick={() => handleChange(6)} checked={user.preferredRace[6]}>No preference</input>
                </div>
                <div>
                    <label htmlFor='preferred_sex'>Are you seeking a man or a woman?</label>
                    <input type='radio' name='preferred_sex' value={user.preferredSex} onClick={setUser({...user, preferredSex: 'Man'})}>Man</input>
                    <input type='radio' name='preferred_sex' value={user.preferredSex} onClick={setUser({...user, preferredSex: 'Woman'})}>Woman</input>
                    <input type='radio' name='preferred_sex' value={user.preferredSex} onClick={setUser({...user, preferredSex: 'No preference'})}>No preference</input>
                </div>
                <div>
                    <label htmlFor='goal'>Are you looking for a:</label>
                    <input type='radio' name='goal' value={user.goal} onClick={setUser({...user, goal: 'Relationship'})}>Relationship</input>
                    <input type='radio' name='goal' value={user.goal} onClick={setUser({...user, goal: 'Marriage'})}>Marriage</input>
                    <input type='radio' name='goal' value={user.goal} onClick={setUser({...user, goal: 'Casual Sex'})}>Casual Sex</input>
                    <input type='radio' name='goal' value={user.goal} onClick={setUser({...user, goal: 'Other'})}>Other</input>
                </div>
                <div>
                    <label htmlFor='values'>If you found a wallet on the ground what would you do with it?</label>
                    <input type='radio' name='values' value={user.values} onClick={setUser({...user, values: 'save/invest'})}>Save/Invest it</input>
                    <input type='radio' name='values' value={user.values} onClick={setUser({...user, values: 'spend'})}>Spend it</input>
                    <input type='radio' name='values' value={user.values} onClick={setUser({...user, values: 'donate'})}>Donate it</input>
                    <input type='radio' name='values' value={user.values} onClick={setUser({...user, values: 'return'})}>Return it</input>
                </div>
                <div>
                    <label htmlFor='desires'>Please rate on a scale of 1 to 10 (1 being least important, 10 being most important) how important it is to you that your partner have:</label>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires1: e.target.value})}>A good income</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires2: e.target.value})}>Good looks</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires3: e.target.value})}>High intelligence</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires4: e.target.value})}>Athletic ability</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires5: e.target.value})}>A pleasant personality</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, desires6: e.target.value})}>A lot of friends</input>
                </div>
                <div>
                    <label htmlFor='attributes'>Please rate on a scale of 1 to 10 (1 being the lowest, 10 being the highest) the degree to which you possess the following attributes:</label>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes1: e.target.value})}>A good income</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes2: e.target.value})}>Good looks</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes3: e.target.value})}>High intelligence</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes4: e.target.value})}>Athletic ability</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes5: e.target.value})}>A pleasant personality</input>
                    <input required type='number' min={1} max={10} maxLength={2} onChange={e => setUser({...user, attributes6: e.target.value})}>A lot of friends</input>
                </div>
                <div>
                    <input type='submit' value='Create Profile' />
                </div>
            </form>
        </div>
    )
}

export default Signup