import React from 'react';
import './MainPage.css';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

import {Col, Divider, Row} from "antd";


export default class MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shownChannel : {},
            shownChannelId : '',
            availableChannels : [],
            user : {}
        }
    }

    handleChannelClick = (channelId) => {
        this.setState({shownChannelId : channelId})
    }

    render(){



        return(<div className="full-height">
                <Header/>
            <Row className = "full-height">
                <Col span = {5} className="full-height">
                    <Sidebar onChannelClick = {this.handleChannelClick}/>
                </Col>
                <Col span = {19} className={"full-height"}>
                    <Chat shownChannel = {this.state.shownChannel} shownChannelId = {this.state.shownChannelId}/>
                </Col>
            </Row>
        </div>)
    }
}
