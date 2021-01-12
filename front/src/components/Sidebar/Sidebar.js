import React from 'react';
import './Sidebar.css';
import axios from "axios";
import {Button, Card, Input} from "antd";
import SidebarChannel from "../SidebarChannel/SidebarChannel";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    handleChannelClick = (e, id) => {
        e.preventDefault();
        this.props.onChannelClick(id);
    }

    render(){

        let channelsInformations = [];

        channelsInformations.push({
            id: 1,
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit ?"
        })
        channelsInformations.push({
            id: 2,
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 3,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 5,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 6,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 7,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voita?"
        })
        channelsInformations.push({
            id: 8,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit ?"
        })

        let renderedChannels = [];

        for(let index = 0; index < channelsInformations.length; index++){
            let channel = channelsInformations[index];
            renderedChannels.push(<Card size="small" className="text-left Card rounded" onClick={e => this.handleChannelClick(e, channel.id)}>
                <h6>{channel.channelName}</h6>
                {channel.lastMessage}
            </Card>)

        }

        return(<div className={"full-height Sidebar scrollable-container"}>
            {Sidebar_top()}
            <Input.Search size = "medium" allowClear="true" enterButton="Search"/>
            {renderedChannels}
            <Button/>
        </div>)
    }


}

function Sidebar_top() {
    return <div className="p-1 m-1 text-center">
        Channels
    </div>;
}
