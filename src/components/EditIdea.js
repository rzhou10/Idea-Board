import React, { Component } from "react";
import axios from "axios";

class EditIdea extends Component{
    constructor(props){
        super(props);
        this.state = {
            idea: props.title,
            description: props.description,
            initial: props
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    editIdea = (props) => {
        axios.patch(`http://localhost:4000/` + this.state.initial._id);
    }

    render(){
        return(
            <form onSubmit={this.editIdea}>
                <label>
                    Idea: <input type="text" value={this.state.idea} name="idea" onChange={this.handleChange} required/>
                </label>
                <label>
                    Description: <input type="text" value={this.state.description} name="description" onChange={this.handleChange} required/>
                </label>
                <input type="submit" value="Add Idea"/>
            </form>
        )
    }
}

export default EditIdea;