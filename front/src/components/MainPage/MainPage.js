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
            availableChannels : [],
            user : {}
        }
    }

    render(){
        return(<div className="full-height">
                <Header/>
            <Row className = "full-height">
                <Col span = {5} className="full-height">
                    <Sidebar/>
                </Col>
                <Col span = {19} className={"full-height"}>
                    <Chat shownChannel = {this.state.shownChannel}/>
                </Col>
            </Row>
        </div>)
    }
}
