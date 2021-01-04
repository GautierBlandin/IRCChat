import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Header/>

      <div className={"container row"}>
        <div className="col-sm-4">
            <Sidebar/>
        </div>
        <div className="col-sm-8">
            <Chat/>
        </div>
      </div>
    </div>
  );
}

export default App;
