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
        preferredRace: sessionStorage.getItem('preferred_race'),
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
        setUser({userName: '', email: '', pass: '', profilepic: '', userRace: '', userSex: '', preferredRace: [], preferredSex: ''})
        sessionStorage.clear()
    }

    function toggle() {
        if(!user.email){
            return (
                <button><Link to="/login" className='navlink'>Log In</Link></button>
            )
        } else{
            return (
                <button onClick={logout}><Link to="/" className='navlink'>Log Out</Link></button>
            )
        }
    }

    return (
        <div className='nav'>
            <button><Link to="/" className='navlink'>Home</Link></button>
            <button><Link to="/signup" className='navlink'>Sign Up</Link></button>
            <div className='profile-pic'>
            {pic()}
            {handleName()}
            </div>
            {toggle()}
            <button><Link to="/:id" className='navlink'>My Profile</Link></button>
            <button><Link to="/edit" className='navlink'>Edit Profile</Link></button>
            <button><Link to="/matches" className='navlink'>See My Matches</Link></button>
            <Outlet />
        </div>
    )
}

export default NavBar