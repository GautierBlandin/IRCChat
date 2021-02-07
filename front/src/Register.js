import React from "react";
import {Form, Input, Button, Checkbox, Col, Row} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Register.css'
import axios from "axios";

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sign_in : true,
            register_username : "",
            register_password : "",
            register_email:"",
            register_confirm_password: "",
            sign_email : "",
            sign_password : "",
        }
    }


    onRegisterSubmit = (event) => {
        event.preventDefault();
        // send a POST request
        axios({
            method: 'post',
            url: 'http://localhost:8081/auth/register',
            data: {
                email: this.state.register_email,
                password: this.state.register_password,
                username: this.state.register_username,
            }
        });
    }

    onSignInSubmit = (event) => {
        axios({
            method: 'post',
            url: 'http://localhost:8081/auth/login',
            data: {
                email: this.state.sign_email,
                password: this.state.sign_password,
            }
        }).then(res => {
            console.log(res);
            localStorage.setItem("token", res.data);
            window.location.reload(false);
        });
    }

    form = <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
    >
        <Form.Item
            name="email"
            rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({sign_email : event.target.value})})}
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({sign_password : event.target.value})})}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>

        <Form.Item>
            <Button
                onClick = {this.onSignInSubmit}
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Log in
            </Button>
            Or <span className="link" onClick={() => this.setState({sign_in : false})}>register now!</span>
        </Form.Item>
    </Form>

    registerForm = <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
    >
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({register_username : event.target.value})})}
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="email"
            rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({register_email : event.target.value})})}
                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({register_password : event.target.value})})}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
        <Form.Item
            name="confirmPassword"
            rules={[
                {
                    required: true,
                    message: 'Please confirm your Password!',
                },
            ]}
        >
            <Input
                onChange = {(event => {event.preventDefault(); this.setState({register_confirm_password : event.target.value})})}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password Confirmation"
            />
        </Form.Item>

        <Form.Item>
            <Button onClick={this.onRegisterSubmit} type="primary" htmlType="submit" className="login-form-button">
                Register
            </Button>
            Or <span className="link" onClick={() => this.setState({sign_in : true})}>sign in!</span>
        </Form.Item>
    </Form>

    render(){
        let renderForm = this.state.sign_in ? this.form : this.registerForm

        return(
            <Row className="m-4">
                <Col className = "Col" span = {8} offset={8} >
                    {renderForm}
                </Col>
            </Row>
        )
    }
}
