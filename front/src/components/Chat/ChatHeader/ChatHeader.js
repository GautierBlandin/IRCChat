import React from 'react';
import './ChatHeader.css';
import {Card} from "antd";

export default class ChatHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        if(Object.entries(this.props.shownChannel).length === 0){
            return(<Card>Pick a Channel !</Card>)
        }

        return(<div>
            {this.props.shownChannel.name}
        </div>)


    }
}
