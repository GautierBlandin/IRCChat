import React from 'react';
import './ChatBody.css';
import {Avatar, Card, Col, Row} from "antd";
import { UserOutlined } from '@ant-design/icons';

export default class ChatBody extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.receiveMessage();
    }

    receiveMessage(){
        this.props.socket.on('message', (message) => {
            console.log(message);
        })
    }

    Message = (message) =>{
        let cssClass = (message.is_user ? "message" : "messageOther")
        let cssClass2 = (message.is_user? "messageContainer" : "messageOtherContainer")
        return(<div className={cssClass2}>
            <div className={cssClass}>
                {message.user_nickname}: {message.message}
         </div>
        </div>)
    }

    render(){
        if(this.props.shownChannel === undefined)
        {return(<div></div>)}
        else {
            let messages = [];
            this.props.shownChannel.messages.forEach((message) => messages.push({
                user_id: message.user,
                is_user: this.props.user.id === message.user,
                message: message.content,
                user_nickname: message.user.username,
            }))
            let renderedMessages = [];
            messages.forEach(message => renderedMessages.push(this.Message(message)))

            return (<div className="pt-4 position-relative">
                    {renderedMessages}
                    </div>
            )

        }
    }
}
