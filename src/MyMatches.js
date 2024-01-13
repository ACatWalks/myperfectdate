import React from 'react'
import NavBar from './NavBar'
import Chats from './Chats'

function MyMatches() {
    const userEmail = sessionStorage.getItem('email')
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
            if(user.preferredSex === 'No preference' && user.goals === other.goals && user.preferredRace.includes(other.userRace)){
                score = score + 10
            }
            else if(user.preferredSex === 'No preference' && user.goals === other.goals && user.preferredRace.includes('No preference')){
                score = score + 10
            }
            else if(user.preferredRace.includes('No preference') && user.preferredSex === other.userSex && user.goals === other.goals){
                score = score + 10
            }
            else if(user.preferredRace.includes(other.userRace) && user.preferredSex === other.userSex && user.goals === other.goals){
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
        return matches
    }
    async function handleClick(){
        const user = await fetch(`https://my-perfect-date.herokuapp.com/users/${userEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return <Chats user={user} />
    }
    return (
        <div>
            <NavBar />
            {findMatches()}
            <button onClick={handleClick}>Chat with your matches</button>
        </div>
    )
}

export default MyMatches