import React, { useState } from 'react'
import {Link, Outlet} from 'react-router-dom'

function NavBar() {
    const [user, setUser] = useState({
        userName: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        pass: sessionStorage.getItem('pass'),
        profilepic: sessionStorage.getItem('profilepic'),
        userRace: sessionStorage.getItem('user_race'),
        userSex: sessionStorage.getItem('user_sex'),
        preferredSex: sessionStorage.getItem('preferred_sex')
    })

    function handleName() {
        if(user.userName){
            return (
                <li>
                    Welcome {user.userName}
                </li>
            )
        } else{
            return (
                <li>
                    You must be logged in 
                </li>
            )
        }
    }

    function pic() {
        if(!user.profilepic){
            return (
                <div>
                    <img src='https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png' alt="Generic profile pic" />
                </div>
            )
        } else{
            return (
                <div>
                    <img src={user.profilepic} alt="My profile pic" />
                </div>
            )
        }
    }

    function logout() {
        setUser({userName: '', email: '', pass: '', profilepic: '', userRace: '', userSex: '', preferredSex: ''})
        sessionStorage.clear()
    }

    function toggle() {
        if(!user.email){
            return (
                <button><Link to="/login">Log In</Link></button>
            )
        } else{
            return (
                <button onClick={logout}><Link to="/">Log Out</Link></button>
            )
        }
    }

    return (
        <div className='nav'>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/signup">Sign Up</Link></button>
            {toggle()}
            <button><Link to="/edit">Edit Profile</Link></button>
            <button><Link to="/matches">See My Matches</Link></button>
            <Outlet />
        </div>
    )
}

export default NavBar