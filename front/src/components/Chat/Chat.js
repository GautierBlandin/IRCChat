import React from 'react';
import './Chat.css';
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";

export default class Chat extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(<div>
            <ChatHeader {...this.props}/>
            <ChatBody {...this.props}/>
        </div>)
    }
}
