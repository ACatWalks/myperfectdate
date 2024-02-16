import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ChatCard from './ChatCard'
import NavBar from './NavBar'

function ChatActivity() {
    const {chatId} = useParams()
    const[messageContent, setMessageContent] = useState([])
    const userId = sessionStorage.getItem('id')
    const by = sessionStorage.getItem('userName')
    const [newMessage, setNewMessage] = useState({
        text: '',
        author: userId
    })
    const content = async () => {
        const req = await fetch(`https://my-perfect-date.herokuapp.com/chats/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        const res = await req.json()
        setMessageContent(res)
    }
    useEffect(() => {
        content()
    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        const messageCreated = await fetch(`https://my-perfect-date/herokuapp.com/chats/messages/${chatId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        })
        content()
    }

    return (
        <div>
            <NavBar />
            {messageContent.map(message => {
                return (
                    <ChatCard message={message} />
                )
            })}
            <form onSubmit={e => handleSubmit(e)}>
                <input textarea required onChange={e => setNewMessage({...newMessage, text: e.target.value})} />
                <p>By: {by}</p>
                <input type='submit' value='Add New Comment' />
            </form>
        </div>
    )
}

export default ChatActivity