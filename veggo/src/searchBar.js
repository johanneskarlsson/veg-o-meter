import React, { Component } from "react";
import { connect } from 'react-redux'


class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }

    }

    handleChange = (event) => {
        const text = event.target.value;
        this.setState({text: text});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const { text } = this.state;
        this.props.search(text)
        console.log("Action sent");
   
    }

    render() {

		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" onChange={this.handleChange} placeholder="Vegetable..." name="search" />
				<button type="submit">
					<p>Search</p>
				</button>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
    search: text => dispatch({ type:"SEARCH", payload:text })
  })

export default connect(
    null,
    mapDispatchToProps
  )(SearchBar)
