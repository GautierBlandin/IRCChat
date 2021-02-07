import React from 'react';
import './Sidebar.css';
import axios from "axios";
import {Button, Card, Input, Row, Col} from "antd";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import {SidebarTop} from "./SidebarTop";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChannelClick = (e, id) => {
        e.preventDefault();
        this.props.onChannelClick(id);
    }

    render(){


        let renderedChannels = [];

        for(let index = 0; index < this.props.availableChannels.length; index++){
            let channel = this.props.availableChannels[index];
            renderedChannels.push(<Card size="small" className="text-left Card rounded" onClick={e => this.handleChannelClick(e, channel._id)}>
                <h6>{channel.title}</h6>
            </Card>)

        }

        return(<div className={"full-height Sidebar scrollable-container"}>
            {<SidebarTop onChannelCreation = {this.props.onChannelCreation}/>}
            <Input.Search size = "medium" allowClear="true" enterButton="Search"/>
            {renderedChannels}
            <Button/>
        </div>)
    }


}
