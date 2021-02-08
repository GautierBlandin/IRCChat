import React from 'react';
import './ChatBody.css';
import {Avatar, Card, Col, Row} from "antd";
import { UserOutlined } from '@ant-design/icons';

export default class ChatBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {renderedMessages : []}
        this.receiveMessage();
    }

    componentDidMount() {
        if(this.props.shownChannel.messages) {
            this.props.shownChannel.messages.forEach((message) => this.state.renderedMessages.push({
                user_id: message.user,
                is_user: this.props.user.id === message.user,
                message: message.content,
                user_nickname: message.user.username,
            }))
            this.setState({renderedMessages: this.state.messages})
        }
    }

    receiveMessage(){
        console.log(this.state);
        this.props.socket.on('message', (message) => {
            this.state.renderedMessages.push({
                    user_id: message.user._id,
                    is_user: this.props.user._id === message.user._id,
                    message: message.content,
                    user_nickname: message.user.username,
                });
            this.setState({renderedMessages : this.state.renderedMessages});
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
            let messages = this.state.renderedMessages;

            let renderedMessages = [];
            if(this.state.renderedMessages) messages.forEach(message => renderedMessages.push(this.Message(message)))

            return (<div className="pt-4 position-relative">
                    {renderedMessages}
                    </div>
            )

        }
}
