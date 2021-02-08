import React from 'react';
import './ChatBody.css';
import {useState, useEffect} from "react";

export default function ChatBody(props){

    const [messages, setMessages] = useState([]);
    const [renderedMessages, setRenderedMessages] = useState([]);

    useEffect(() => {
        let updatedMessages = [];
        props.shownChannel.messages.forEach((message) => {
            updatedMessages.push({
            user_id: message.user,
            is_user: props.user._id === message.user,
            message: message.content,
            user_nickname: message.user.username,
        })})
        setMessages(updatedMessages)
        }
        , [props.shownChannel]
    )

    useEffect( () => {
        console.log('been called');
        let updatedRenderedMessages = [];
        messages.forEach(message => updatedRenderedMessages.push(Message(message)))
        setRenderedMessages(updatedRenderedMessages)
    }, [messages])

    useEffect(() => {
        console.log('test')
        let updateRealTimeMessages = [];
        props.socket.on('message', (message) => {
            let newMessage = {
                user_id: message.user._id,
                is_user: props.user._id === message.user._id,
                message: message.content,
                user_nickname: message.user.username,
            }
            setMessages((messages) => [...messages, newMessage]);
        })
    }, [])

    let Message = (message) =>{
        let cssClass = (message.is_user ? "message" : "messageOther")
        let cssClass2 = (message.is_user? "messageContainer" : "messageOtherContainer")
        return(<div className={cssClass2}>
            <div className={cssClass}>
                {message.user_nickname}: {message.message}
            </div>
        </div>)
    }

    return (<div className="pt-4 position-relative">
            {renderedMessages}
        </div>
    )
}