import React from 'react';
import './SidebarChannel.css';

export default class SidebarChannel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            channelInformations : props.channelInformations
        }
    }

    render(){
        return(<div className="bg-light border-0 rounded m-1">
            <div className="channelName overflow-hidden">{this.props.channelInformations.channelName}</div>
            <div className="lastMessage overflow-hidden">{this.props.channelInformations.lastMessage}</div>
        </div>)
    }
}
