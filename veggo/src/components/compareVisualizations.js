import React, { Component } from "react";
import { connect } from "react-redux";
import RadarChart from "./radarChart";

class CompareVisualizations extends Component {
	render() {
		return (
			<div>
				<h3>Ranking</h3>
				<RadarChart data={this.props.compare} vegetables={this.props.vegetables} />
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
