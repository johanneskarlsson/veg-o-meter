import React, { Component } from "react";
import { connect } from "react-redux";

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	handleChange = event => {
		const text = event.target.value;
		this.setState({ text: text });
	};

	handleSubmit = event => {
		const { text } = this.state;
		this.props.search(text);
		event.preventDefault();
		console.log("Action sent");
	};

	render() {
		return (
			<div className="searchbar">
				<h2>Sökruta</h2>
				<form
					onSubmit={this.handleSubmit}
					className="form-inline d-flex justify-content-center"
				>
					<div className="form-group m-2">
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Grönsak..."
							name="search"
							className="form-control"
						/>
					</div>
					<div className="form-group m-2">
						<button type="submit" className="btn btn-primary">
							Sök
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	search: text => dispatch({ type: "SEARCH", payload: text })
});

export default connect(null, mapDispatchToProps)(SearchBar);
