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
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addIdea(){
        const reqBody = {
            "idea": this.state.idea,
            "description": this.state.description,
        }

        let sliced = this.state.ideas.slice()
        axios.post(`http://localhost:4000/add`).then(
            () => {
                sliced.push(reqBody);
                this.setState({ideas: sliced})
            }
        )
    }

    removeIdea(){
        
    }

    editIdea(){

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
                        <input type="submit" />
                    </form>
                </div>
                <div className="ideas">
                    {this.state.ideas.map(
                        (idea) => {
                            <div className="specificIdea">
                                <div className="changeStuff">{this.editIdea}{this.removeIdea}</div>
                                <p>{idea.idea}</p>
                                <p>{idea.description}</p>
                            </div>
                        }
                    )}
                </div>
            </div>
        )
    }
}

export default IdeaBoard;