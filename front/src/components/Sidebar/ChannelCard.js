import React, {useState} from "react";
import {Button, Card, Col, Input, Modal, Row} from "antd";
import {CloseOutlined, EditOutlined, UserAddOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";

export default function ChannelCard(props){

    const onDeleteClick = (e) => {
        e.preventDefault();
        props.onChannelDelete(props.channel);
    }

    const [show, setShow] = useState(false);
    const [showInvite, setShowInvite] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseInvite = () => setShowInvite(false);
    const handleShowInvite = () => setShowInvite(true);

    let button = '';
    if(props.user._id === props.channel.owner){
        button = <Button
            onClick={onDeleteClick}
            shape = "circle"
            type="primary"
            icon={<CloseOutlined />}/>
    }

    let button2 = '';
    if(props.user._id === props.channel.owner){
        button2 = <Button
            onClick={handleShowInvite}
            shape = "circle"
            type="primary"
            icon={<UserAddOutlined />}/>
    }

    let button3 = '';
    if(props.user._id === props.channel.owner){
        button3 = <Button
            onClick={handleShow}
            shape = "circle"
            type="primary"
            icon={<EditOutlined />}/>
    }

    return(<Card size="small" className="text-left Card rounded"
                 onClick={e => {
                     if(props.shownChannel === undefined) {
                         props.onChannelClick(props.channel._id, undefined);
                     } else{
                         props.onChannelClick(props.channel._id, props.shownChannel._id)
                     }
                 }}
    >
        <Row>
            <Col span = {15}>
                <h6>{props.channel.title}</h6>
            </Col>
            <Col span = {3}>
                {button}
            </Col>
            <Col span = {3}>
                {button2}
            </Col>
            <Col span = {3}>
                {button3}
            </Col>
            <Modal visible={show} onOk={handleClose} onCancel={handleClose}>
                <Input.Search
                    size = "medium"
                    allowClear="true"
                    enterButton="Rename"
                    onSearch={value => {
                        props.onChannelRename(props.shownChannel, value);
                        handleClose();
                    }}
                />
            </Modal>
            <Modal visible={showInvite} onOk={handleCloseInvite} onCancel={handleCloseInvite}>
                <p>Invite code : {props.channel._id}</p>
            </Modal>
        </Row>

    </Card>)
}
