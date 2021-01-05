import React from 'react';
import './ChatHeader.css';
import {Card} from "antd";

export default class ChatHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        // if(Object.entries(this.props.shownChannel).length === 0){
        if(this.props.shownChannelId === ''){
            return(<Card className={"text-center"}><h3>Pick a Channel !</h3></Card>)
        }

        return(<Card className={"text-center"}>
            <h3>The current channel ID : {this.props.shownChannelId}</h3>
        </Card>)


    }
}
