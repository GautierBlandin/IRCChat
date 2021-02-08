import React from 'react';
import './Chat.css';
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody2";
import ChatInput from "./ChatInput/ChatInput";

export default class Chat extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.shownChannel !== undefined){
            return(<div className={"full-height"}>
                <ChatHeader {...this.props}/>
                <ChatBody {...this.props}/>
                <ChatInput {...this.props}/>
            </div>)
        }else{
            return(<div className={"full-height"}>
                <ChatHeader {...this.props}/>
            </div>)
        }


    }
}
