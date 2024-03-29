import React from 'react'
import NavBar from './NavBar'
import Chats from './Chats'
import {Link, Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function MyMatches() {
    const userEmail = sessionStorage.getItem('email')
    const userId = sessionStorage.getItem('id')
    const navigate = useNavigate()
    async function findMatches(){
        const user = await fetch(`https://my-perfect-date.herokuapp.com/users/${userEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const others = await fetch(`https://my-perfect-date.herokuapp.com/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let matches = []
        for(let i=0; i<others.length; i++){
            let score = 0
            let other = others[i]
            let userRaceIndex 
            switch(user.race){
                case 'Asian':
                    userRaceIndex = 0;
                    break;
                case 'White':
                    userRaceIndex = 1;
                    break;
                case 'Hispanic':
                    userRaceIndex = 2;
                    break;
                case 'Native American':
                    userRaceIndex = 3;
                    break;
                case 'Black':
                    userRaceIndex = 4;
                    break;
                case 'Mixed race/Other':
                    userRaceIndex = 5;
                    break;
            }
            if(user.preferredSex === 'No preference' && user.goals === other.goals && other.preferredRace[userRaceIndex] === true){
                score = score + 10
            }
            else if(user.preferredSex === 'No preference' && user.goals === other.goals && user.preferredRace[6] === true){
                score = score + 10
            }
            else if(user.preferredRace[6] === true && user.preferredSex === other.userSex && user.goals === other.goals){
                score = score + 10
            }
            else if(other.preferredRace[userRaceIndex] === true && user.preferredSex === other.userSex && user.goals === other.goals){
                score = score + 10
            }
            if(user.values === other.values){
                score = score + 1
            }
            if(user.desires1 === other.attributes1){
                score = score + 1
            }
            if(user.desires2 === other.attributes2){
                score = score + 1
            }
            if(user.desires3 === other.attributes3){
                score = score + 1
            }
            if(user.desires4 === other.attributes4){
                score = score + 1
            }
            if(user.desires5 === other.attributes5){
                score = score + 1
            }
            if(user.desires6 === other.attributes6){
                score = score + 1
            }
            if(score >= 15){
                matches.push(other.userName)
            }
        }
        let reqBody = {
            self: userId,
            match: ''
        }
        /*function setMatchId(e) {
            e.preventDefault()
            reqBody.match = e.target.value
        }*/
        async function createChat(id) {
            //e.preventDefault()
            reqBody.match = id
            const chat = await fetch(`https://my-perfect-date.herokuapp.com/chats/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
            const res = await chat.json()
            navigate('/chats')
        }
        /*function handleClick(id){
            setMatchId(id)
            createChat(e)
        }*/
        matches.map((match) => {
            <div>
                <Link to={`/${match.id}`} className='navlink'>{match.userName}</Link>
                <button id='match-button' onClick={createChat(match.id)}>Chat with this match</button>
                <Outlet />
            </div>
        })
        return matches
    }
    /*async function handleClick(){
        const user = await fetch(`https://my-perfect-date.herokuapp.com/users/${userEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(user){
            return <Chats user={user} />
        }
        else{
            return <p>User not found. Are you logged in?</p>
        }
    }*/
    return (
        <div className='matches'>
            <NavBar />
            {findMatches}
        </div>
    )
}

export default MyMatches