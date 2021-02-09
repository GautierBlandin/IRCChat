import React from 'react';
import './ChatBody.css';
import {useState, useEffect} from "react";

export default function ChatBody(props){

    const [messages, setMessages] = useState([]);
    const [renderedMessages, setRenderedMessages] = useState([]);

    useEffect(() => {
        let updatedMessages = [];
        props.shownChannel.messages.forEach((message) => {
            updatedMessages.unshift({
            user_id: message.user,
            is_user: props.user._id === message.user._id,
            message: message.content,
            user_nickname: message.user.username,
        })})
        setMessages(updatedMessages)
        }
        , [props.shownChannel]
    )

    useEffect( () => {
        let updatedRenderedMessages = [];
        messages.forEach(message => updatedRenderedMessages.push(Message(message)))
        setRenderedMessages(updatedRenderedMessages)
    }, [messages])

    useEffect(() => {
        props.socket.on('message', (message) => {
            let newMessage = {
                user_id: message.user._id,
                is_user: props.user._id === message.user._id,
                message: message.content,
                user_nickname: message.user.username,
            }
            let newRenderedMessage = Message(newMessage);
            setRenderedMessages((messages) => [...messages, newRenderedMessage]);
        })
    }, [])

    useEffect(() => {
        props.socket.on('user_joined',(object) => {
            console.log(object)
            let userJoined = <div className="serverMessage">
                {object.user.username} has joined
            </div>
            setRenderedMessages((renderedMessages) => [...renderedMessages, userJoined])
        })
    }, [])

    useEffect(() => {
        props.socket.on('user_left',(object) => {
            console.log(object)
            let userLeft = <div className="serverMessage">
                {object.user.username} has left
            </div>
            setRenderedMessages((renderedMessages) => [...renderedMessages, userLeft])
        })
    }, [])

    let Message = (message) =>{
        let cssClass = (message.is_user ? "message" : "messageOther")
        let cssClass2 = (message.is_user? "messageContainer" : "messageOtherContainer")
        let cssClass3 = (message.is_user? "userName" : "userNameOther")
        return(
                <div className={cssClass2}>
                    <div className={cssClass3}>{message.user_nickname}</div>
            <div className={cssClass}>
                {message.message}
            </div>
        </div>
           )
    }

    return (<div className="pt-4 position-relative ChatBody">
            {renderedMessages}
        </div>
    )
}
