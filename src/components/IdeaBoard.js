import React, { Component } from "react";
import axios from "axios";

class IdeaBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            idea: "",
            description: "",
            ideas: []
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/`).then((data) =>
            this.setState( { ideas: data } )
        )
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addIdea = () => {
        const reqBody = {
            "idea": this.state.idea,
            "description": this.state.description,
        }

        let sliced = this.state.ideas.slice();
        axios.post(`http://localhost:4000/add`, reqBody).then(
            () => {
                sliced.push(reqBody);
                this.setState({ideas: sliced})
            }
        );
    }

    removeIdea = (props) => {
        let sliced = this.state.ideas.slice();
        axios.delete(`http://localhost:4000/` + props._id).then(
            () => {
                let filtered = sliced.filter((val) => {
                    return val !== props;
                });
                this.setState({ideas: filtered});
            }
        )
    }

    editIdea = (props) => {
        axios.patch(`http://localhost:4000/` + props._id);
    }

    render(){
        return(
            <div>
                <div className="addIdea">
                    <form onSubmit={this.addIdea}>
                        <label>
                            Idea: <input type="text" value={this.state.idea} name="idea" onChange={this.handleChange} required/>
                        </label>
                        <label>
                            Description: <input type="text" value={this.state.description} name="description" onChange={this.handleChange} required/>
                        </label>
                        <input type="submit" value="Add Idea"/>
                    </form>
                </div>
                <div className="ideas">
                    {this.state.ideas.map((idea) => 
                        <div key={idea._id} className="specificIdea">
                            <div className="changeStuff"><button onClick={this.editIdea(idea)}></button> <button onClick={this.removeIdea(idea)}></button></div>
                            <p>{idea.idea}</p>
                            <p>{idea.description}</p>
                        </div>
                        
                    )}
                </div>
            </div>
        )
    }
}

export default IdeaBoard;