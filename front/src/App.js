import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import axios from "axios";
import MainPage from "./components/MainPage/MainPage";
import Register from "./Register";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8081";

class  App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {logged_in : false,
        user : {},
        socket : {}}
    }

    componentDidMount() {
        axios({
            method : 'get',
            url : 'http://localhost:8081/auth/token',
            headers : {
                'auth-token' : localStorage.getItem('token') ?? '',
            }
        }).then(res => {
            if(res) {
                this.setState({
                    logged_in : true,
                    user : res.data,
                });
            }
        })

        let socket = socketIOClient(ENDPOINT, {query : {token : localStorage.getItem('token')}});
        this.setState({socket : socket})
    }


    render() {
        if(this.state.logged_in){
            return (
                <div className={"App"}>
                    <MainPage user = {this.state.user} socket = {this.state.socket}/>
                </div>
            );
        }
        else{
            return(
                <div className={"App"}>
                    <Register/>
                </div>
            )
        }
    }
}

export default App;
