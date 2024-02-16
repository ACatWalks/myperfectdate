function ChatCard({ message }) {
    const by = sessionStorage.getItem('userName')
    return (
        <div className="chatcard">
            <h4>{message.text}</h4>
            <h3><strong>- {by}</strong></h3>
        </div>
    )
}

export default ChatCard