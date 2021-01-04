import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            input : ''
        }
    }

    render(){
        return(<div className="bg-light border-0 rounded">
            <input onChange={this.handleChange} className="border-0 bg-light" type="search"  id="searchBar" name="searchBar" placeholder="Search a channel"/>
        </div>)
    }

    handleChange = (event) =>{
        event.preventDefault()
        this.setState({
            input: event.target.value
        })
    }
}
