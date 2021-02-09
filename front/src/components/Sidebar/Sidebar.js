import React from 'react';
import './Sidebar.css';
import axios from "axios";
import {Button, Card, Input, Row, Col} from "antd";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import {SidebarTop} from "./SidebarTop";
import ChannelCard from "./ChannelCard";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){


        let renderedChannels = [];

        for(let index = 0; index < this.props.availableChannels.length; index++){
            let channel = this.props.availableChannels[index];
            renderedChannels.push(<ChannelCard {...this.props} channel = {channel}/>)

        }

        return(<div className={"full-height Sidebar scrollable-container"}>
            {<SidebarTop {...this.props}/>}
            {/*<Input.Search size = "medium" allowClear="true" enterButton="Search"/>*/}
            {renderedChannels}
            <Button/>
        </div>)
    }


}
