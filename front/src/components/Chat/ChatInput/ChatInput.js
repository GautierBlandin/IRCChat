import React from 'react';
import './ChatInput.css';
import {Input} from "antd";

export default class ChatInput extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(<div className={"ChatInput"}>
            <div className={"p-4"}>
              <Input.Search size = "medium" allowClear="true" enterButton="Send"/>
            </div>
        </div>)
    }
}
