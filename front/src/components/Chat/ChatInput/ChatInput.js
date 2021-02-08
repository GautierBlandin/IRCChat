import React from 'react';
import './ChatInput.css';
import {Input} from "antd";
import axios from "axios";

export default class ChatInput extends React.Component{
    constructor(props) {
        super(props);
    }

    onSend = (value) => {
        this.props.socket.emit('message_send', {
            channelId : this.props.shownChannel._id,
            message : value
        });
    }

    render(){
        return(<div className={"ChatInput"}>
            <div className={"p-4"}>
              <Input.Search size = "medium"
                            allowClear="true"
                            enterButton="Send"
                            onSearch={this.onSend}
              />
            </div>
        </div>)
    }
}
