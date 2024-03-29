import React from 'react';
import './ChatHeader.css';
import {Card} from "antd";

export default class ChatHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        if(this.props.shownChannel === undefined){
            return(<Card className={"text-center"}><h3>Pick a Channel !</h3></Card>)
        }

        return(<Card className={"text-center"}>
            <h3>Welcome to {this.props.shownChannel.title}</h3>
        </Card>)


    }
}
