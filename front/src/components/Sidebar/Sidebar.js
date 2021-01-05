import React from 'react';
import './Sidebar.css';
import axios from "axios";
import {Card, Input} from "antd";
import SidebarChannel from "../SidebarChannel/SidebarChannel";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    channelsInformations = []

    render(){

        this.channelsInformations.push({
            _id: 1,
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 2,
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 3,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            _id: 4,
            channelName : "WTF PK Y PAS DE NOM",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })

        let renderedChannels = [];

        for(let index = 0; index < this.channelsInformations.length; index++){
            let channel = this.channelsInformations[index];
            renderedChannels.push(<Card  size="small" className="text-left Card rounded">
                <h6>{channel.channelName}</h6>
                {channel.lastMessage}
            </Card>)

        }

        return(<div className={"full-height Sidebar scrollable-container"}>
            {Sidebar_top()}
            <Input.Search size = "medium" allowClear="true" enterButton="Search"/>
            {renderedChannels}
        </div>)
    }


}

function Sidebar_top() {
    return <div className="p-1 m-1 text-center">
        Channels
    </div>;
}
