import React, { Component } from "react";
import { connect } from "react-redux";
import CompareRadarChart from "./compareRadarChart";
import CompareBarChart from "./compareBarChart";

class CompareVisualizations extends Component {
	render() {
		return (
			<div>
				<h2>Ranking</h2>
				<CompareRadarChart data={this.props.compare} vegetables={this.props.vegetables} />
				<CompareBarChart data={this.props.compare} vegetables={this.props.vegetables} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		vegetables: state.vegetables.vegetables,
		compare: state.vegetables.compare
	};
};

export default connect(mapStateToProps, null)(CompareVisualizations);
