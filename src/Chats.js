import { React, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import NavBar from './NavBar'

function Chats() {
    const userId = sessionStorage.getItem('id')
    const [chats, setChats] = useState([])
    const getAllChats = async () => {
        const req = await fetch(`https://my-perfect-date.herokuapp.com/chats/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        const res = await req.json()
        setChats(res.data)
    }
    useEffect(() => {
        getAllChats()
    }, [])
    const displayChats = () => {
        chats.map(chat => {
            return (
                <h1>{chat}</h1>
            )
        })
    }
    useEffect(() => {
        displayChats()
    }, [chats])

    return (
        <div>
            <NavBar />
            <h2>Your Chats</h2>
            <hr />
            {
                chats.map(chatId => {
                    return (
                        <li>
                            <Link to={`/chatactivity/${chatId}`}>Join Chat</Link>
                        </li>
                    )
                })
            }
        </div>
    )
}   

export default Chats