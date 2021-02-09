import React from 'react';
import './ChatInput.css';
import {Input} from "antd";
import axios from "axios";

export default class ChatInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {inputValue : ''}
    }

    setValue = (value) => {
        this.setState({inputValue : value})
    }

    onSend = (value) => {
        if(value !== '') {
            this.props.socket.emit('message_send', {
                channelId: this.props.shownChannel._id,
                message: value
            });
        }
        this.setValue('');
    }

    render(){
        return(<div className={"ChatInput"}>
            <div className={"p-4"}>
              <Input.Search
                      value = {this.state.inputValue}
                      onChange={event => this.setValue(event.target.value)}
                      size = "medium"
                            allowClear="true"
                            enterButton="Send"
                            onSearch={this.onSend}
              />
            </div>
        </div>)
    }
}
