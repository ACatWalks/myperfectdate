import React from 'react'
import NavBar from './NavBar'

function Profile() {
    const user = {
        userName: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        profilepic: sessionStorage.getItem('profilepic'),
        userRace: sessionStorage.getItem('user_race'),
        userSex: sessionStorage.getItem('user_sex'),
        preferredRace: sessionStorage.getItem('preferred_race'),
        preferredSex: sessionStorage.getItem('preferred_sex')
    }

    return (
        <main>
            <NavBar />
            <h1>My Profile Page</h1>
            <h5>Username: {user.userName}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Profile picture: {user.profilepic}</h5>
            <h5>Race: {user.userRace}</h5>
            <h5>Sex: {user.userSex}</h5>
            <h5>Preferred race(s): {user.preferredRace}</h5>
            <h5>Preferred sex(s): {user.preferredSex}</h5>
        </main>
    )
}

export default Profile