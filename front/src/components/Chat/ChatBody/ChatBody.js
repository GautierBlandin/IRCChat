import React from 'react';
import './ChatBody.css';
import {Avatar, Card, Col, Row} from "antd";
import { UserOutlined } from '@ant-design/icons';

export default class ChatBody extends React.Component{
    constructor(props) {
        super(props);
    }

    message1 = {
        user_id : 1,
        user_nickname : 'Zac',
        message : 'Tu en es où du projet ?',
        is_user : false
    }

    message2 = {
        user_id : 2,
        user_nickname : 'Gautier',
        message : 'Regarde, on a un super front ! And today we are having a really great day here in New-York ! The sun is shining, the birds are singing',
        is_user : true,
    }

    message3 = {
        user_id : 1,
        user_nickname : 'Zac',
        message : 'Ah ouais c\'est top !',
        is_user : false
    }

    Message = (message) =>{
        let cssClass = (message.is_user ? "message" : "messageOther")
        let cssClass2 = (message.is_user? "messageContainer" : "messageOtherContainer")
        return(<div className={cssClass2}>
            <div className={cssClass}>
                {message.user_nickname}: {message.message}
         </div>
        </div>)
    }

    render(){

        if(Object.entries(this.props.shownChannel).length === 0){
            return(<div className="pt-4 position-relative">
                {this.Message(this.message1)}
                {this.Message(this.message2)}
                {this.Message(this.message3)}
                </div>
                )
        }


        return(<div>

        </div>)

    }
}
