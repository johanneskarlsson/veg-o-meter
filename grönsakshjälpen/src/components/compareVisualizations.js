import React, { Component } from "react";
import { connect } from "react-redux";
import CompareRadarChart from "./compareRadarChart";
import CompareBarChart from "./compareBarChart";
import ColorLegend from "./colorLegend";
import basket from "../images/basket.png";

// Color list
var colorList = [
	"red",
	"green",
	"yellow",
	"blue",
	"purple",
	"lightblue",
	"pink",
	"brown",
	"grey",
	"magenta",
	"teal",
	"navy",
	"olive",
	"beige",
	"darkgoldenrod",
	"darksalmon",
	"ghostwhite",
	"indigo",
	"maroon",
	"lightseagreen",
	"sandybrown"
];

class CompareVisualizations extends Component {
	render() {
		return (
			<div className="container p-0">
				<div className="row mx-auto pt-md-5 pt-4">
					<div className="col-md-5 col-12 mx-auto p-0">
						<CompareBarChart
							data={this.props.compare}
							vegetables={this.props.vegetables}
							selectedOption={this.props.filter[0]}
							color={colorList}
						/>
					</div>
					<div className="col-md-6 col-12 pt-3 pt-md-0 mx-auto p-0">
						<CompareRadarChart
							data={this.props.compare}
							vegetables={this.props.vegetables}
							selectedOption={this.props.filter[0]}
							color={colorList}
						/>
					</div>
					{this.props.compare.length === 0 ? (
						<div className="col-12">
							<h3 className="instructions pt-5 mx-auto p-4">
								Välj en grönsak för att påbörja jämförelsen...
							</h3>
							<div className="row">
								<div className="col-md-4 col-lg-3 col-8 mx-auto">
									<img
										className="img-fluid"
										src={basket}
										alt="Vegetable basket"
									/>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div className="row pt-4">
					<ColorLegend
						data={this.props.compare}
						vegetables={this.props.vegetables}
						color={colorList}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.vegetables.filter);
	return {
		vegetables: state.vegetables.vegetables,
		compare: state.vegetables.compare,
		filter: state.vegetables.filter
	};
};

export default connect(mapStateToProps, null)(CompareVisualizations);
