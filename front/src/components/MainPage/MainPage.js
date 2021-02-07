import React from 'react';
import './MainPage.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import axios from "axios";

import {Col, Row} from "antd";


export default class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            availableChannels: [],
            user: props.user,
        }
    }

    componentDidMount() {
        console.log(localStorage.getItem('token'))
        this.state.user.channels.forEach((channel) => {
            console.log(channel)
            axios({
                url: 'http://localhost:8081/channel/' + channel,
                method: 'get'
            }).then(res => {
                this.state.availableChannels.push(res.data);
                this.setState({availableChannels : this.state.availableChannels})
            })
        })
    }

    handleChannelClick = (channelId) => {
        this.setState({shownChannelId : channelId})
        axios({
            url: 'http://localhost:8081/channel/' + channelId,
            method : 'get'
        }).then(res => this.setState({shownChannel : res.data}))
    }

    handleChannelCreation = (channel) => {
        this.state.availableChannels.push(channel);
        this.setState({availableChannels : this.state.availableChannels})
    }

    render(){

        return(<div className="full-height">
                <Header/>
            <Row className = "full-height">
                <Col span = {5} className="full-height">
                    <Sidebar onChannelClick = {this.handleChannelClick} onChannelCreation = {this.handleChannelCreation} availableChannels = {this.state.availableChannels}/>
                </Col>
                <Col span = {19} className={"full-height"}>
                    <Chat shownChannel = {this.state.shownChannel} user = {this.props.user} socket = {this.props.socket}/>
                </Col>
            </Row>
        </div>)
    }
}
