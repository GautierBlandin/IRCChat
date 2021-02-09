import React from 'react';
import './MainPage.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import axios from "axios";
import socketIOClient from "socket.io-client";
import {Col, Row} from "antd";
const ENDPOINT = "http://127.0.0.1:8081";

export default class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            availableChannels: [],
            user: props.user,
            socket : {}
        }

    }

    componentDidMount() {
        console.log(localStorage.getItem('token'))
        let socket = socketIOClient(ENDPOINT, {query : {token : localStorage.getItem('token')}});
        this.setState({socket : socket})
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

    handleChannelClick = (channelId, leftChannelId) => {
        this.setState({shownChannelId : channelId})
        axios({
            url: 'http://localhost:8081/channel/' + channelId,
            method : 'get'
        }).then(res => this.setState({shownChannel : res.data}))
        if(leftChannelId) this.state.socket.emit('channel_left', leftChannelId)
        this.state.socket.emit('channel_join', channelId)
    }

    handleChannelCreation = (channel) => {
        this.state.availableChannels.push(channel);
        this.setState({availableChannels : this.state.availableChannels})
    }

    handleChannelDelete = (channel) => {
        axios({
            url : 'http://localhost:8081/channel/' + channel._id,
            method : 'delete',
            headers : {
                'auth-token' : localStorage.getItem('token')
            },
        });
        this.state.availableChannels.splice(this.state.availableChannels.indexOf(channel), 1)
        this.setState({availableChannels : this.state.availableChannels})
    }

    handleChannelRename = (channel, newName) => {
        channel.title = newName;
        axios({
            url : 'http://localhost:8081/channel/' + channel._id,
            method : 'put',
            data : channel
        })
    }

    handleChannelJoin = (user, channel_id) => {
        console.log(channel_id);
        console.log(user);
        axios({
            url : 'http://localhost:8081/channel/addUser/' + channel_id,
            method : 'put',
            data : {users : user}
        }).then(console.log)
    }

    render(){

        return(<div className="full-height">
                <Header/>
            <Row className = "full-height">
                <Col span = {5} className="full-height">
                    <Sidebar onChannelClick = {this.handleChannelClick}
                             onChannelCreation = {this.handleChannelCreation}
                             onChannelDelete = {this.handleChannelDelete}
                             onChannelRename = {this.handleChannelRename}
                             onChannelJoin = {this.handleChannelJoin}
                             availableChannels = {this.state.availableChannels}
                             shownChannel = {this.state.shownChannel}
                             user = {this.state.user}
                    />
                </Col>
                <Col span = {19} className={"full-height"}>
                    <Chat shownChannel = {this.state.shownChannel} user = {this.props.user} socket = {this.state.socket}/>
                </Col>
            </Row>
        </div>)
    }
}
