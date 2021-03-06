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
        axios.get("http://localhost:4000/").then((data) =>{
            //this.setState({ ideas: data.data });
            console.log(data)
        }
        )
        .catch(err => {
            throw err;
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addIdea = (e) => {
        e.preventDefault();
        const reqBody = {
            "idea": this.state.idea,
            "description": this.state.description,
        }

        let sliced = this.state.ideas.slice();
        axios.post("http://localhost:4000/add", reqBody).then(
            () => {
                sliced.push(reqBody);
                this.setState({ ideas: sliced })
            }
        )
        .catch(err => {
            throw err;
        });
    }

    removeIdea = (props) => {
        let sliced = this.state.ideas.slice();
        axios.delete("http://localhost:4000/delete" + props._id).then(
            () => {
                //only keeps those that don't match the criteria
                let keptIdeas = sliced.filter((val) => {
                    return val !== props;
                });
                this.setState({ ideas: keptIdeas });
            }
        )
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    render(){
        return(
            <div className="table">
            <div className="row"></div>
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
                            <div className="changeStuff"> <button onClick={this.removeIdea(idea)}></button></div>
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