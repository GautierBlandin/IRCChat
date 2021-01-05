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
        return(<div>
                <Header/>

            <Row>
                <Col span = {5}>
                    <Sidebar/>
                </Col>
                <Col span = {19}>
                    <Chat shownChannel = {this.state.shownChannel}/>
                </Col>
            </Row>
        </div>)
    }
}
