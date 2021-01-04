import React from 'react';
import './Sidebar.css';
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import SidebarChannel from "../SidebarChannel/SidebarChannel";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    channelsInformations = []

    render(){
        this.channelsInformations.push({
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })
        this.channelsInformations.push({
            channelName : "Les bg du 67",
            lastMessage : "Quand est-ce qu'on se voit  aaa aaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaa?"
        })

        let renderedChannels =[];

        for(let index = 0; index < this.channelsInformations.length; index++){
            renderedChannels.push(<SidebarChannel channelInformations = {this.channelsInformations[index]}/>)
        }

        return(<div>

            {Sidebar_top()}
            <SearchBar/>
            {renderedChannels}
        </div>)
    }


}

function Sidebar_top() {
    return <div className="p-1 m-1">
        Channels
    </div>;
}
