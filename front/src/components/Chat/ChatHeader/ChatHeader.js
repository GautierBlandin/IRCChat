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
            <h3>The current channel ID : {this.props.shownChannel._id}</h3>
        </Card>)


    }
}
