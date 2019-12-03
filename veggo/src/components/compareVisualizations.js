import React, { Component } from "react";
import { connect } from "react-redux";
import RadarChart from "./radarChart";

class CompareVisualizations extends Component {
	render() {
		return (
			
					<RadarChart data={this.props.compare} />
			
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		compare: state.vegetables.compare
	};
};

export default connect(mapStateToProps, null)(CompareVisualizations);
