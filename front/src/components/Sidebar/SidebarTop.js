import React from "react";
import {Button, Col, Form, Input, Modal, Row} from "antd";
import {PlusOutlined, PoweroffOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";

export class SidebarTop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible : false,
            new_channel_name : '',
        }
    }

    onButtonClick = () => {
        localStorage.setItem('token', '');
        window.location.reload(false);
    }

    setIsModalVisible = (boolean) => {
        this.setState({isModalVisible : boolean})
    }

    showModal = () => {
        this.setIsModalVisible(true);
    };

    handleOk = () => {
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setIsModalVisible(false);
    };

    onChannelCreationSubmit = (event) => {
        event.preventDefault();
        console.log(localStorage.getItem('token'));
        axios({
            url : 'http://localhost:8081/channel/',
            method : 'post',
            headers : {
                'auth-token' : localStorage.getItem('token')
            },
            data : {
                'title' : this.state.new_channel_name
            }
        }).then(res => {this.props.onChannelCreation(res.data)});
        this.setIsModalVisible(false);
    }

    render() {

        return (<Row className= "text-center p-2">
        <Col span = {18}>Channels</Col>
        <Col span = {6}><Button onClick={this.onButtonClick} shape = "circle" type="primary" icon={<PoweroffOutlined />}/>
            <Button onClick={this.showModal} shape = "circle" type="primary" icon={<PlusOutlined />}/>
        </Col>
        <Modal visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div className={"text-center"}>Create a channel</div>
            <Form
                name="normal_login"
                className=""

            >
                <Form.Item
                    name="channel_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the channel\'s name!',
                        },
                    ]}
                >
                    <Input
                        onChange = {(event => {event.preventDefault(); this.setState({new_channel_name : event.target.value})})}
                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Channel name" />
                </Form.Item>
                <Form.Item>
                    <Button
                        onClick = {this.onChannelCreationSubmit}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Create channel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </Row>)
    }
}
