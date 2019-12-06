import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class CompareBarChart extends Component {
	constructor(props) {
		super(props);
		this.state = { legend: null };
	}

	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.data !== prevProps.data) {
			this.DrawChart();
		}
	}

	componentDidMount = () => {
		this.DrawChart();
	};

	DrawChart = () => {
		console.log("BAR DATA")
		console.log(this.props.data)

		// Data
		var data = this.props.data.map(vegetable => {
			return [
				{ axis: "Energiförbrukning", value: vegetable.energy.ranking},
				{ axis: "Växthusgasutsläpp", value: vegetable.emissions.ranking},
				{ axis: "Fossilutarmning", value: vegetable.fossil_depletion.ranking},
				{ axis: "Markanvändning", value: vegetable.land_use.ranking},
				{ axis: "Markförsurning", value: vegetable.terrestrial_toxicity.ranking},
				{ axis: "Markförgiftning", value: vegetable.terrestrial_acidification.ranking},
				{ axis: "Sötvattenförgiftning", value: vegetable.freshwater_toxicity.ranking},
				{ axis: "Sötvattenförsurning", value: vegetable.freshwater_eutrophication.ranking},
				{ axis: "Marinförsurning", value: vegetable.marine_eutrophication.ranking},
				{ axis: "Vattenfotavtryck", value: vegetable.water_footprint.ranking}
			];
		});

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
			"lavenderbrush",
			"lightseagreen",
			"sandybrown"
		];

		// Create color range
		var color = d3.scaleOrdinal().range(colorList);

		// Max value
		var maxValue = this.props.vegetables.length;

		// Init chart options
		var barChartOptions;
		var margin;
		var width;
		var height;

		// Settings on mobile and desktop
		if (window.innerWidth < 576) {
			margin = { top: 50, right: 80, bottom: 70, left: 80 };
			width =
				Math.min(550, window.innerWidth - 20) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			barChartOptions = {
				w: width,
				h: height,
				margin: margin,
				maxValue: maxValue,
				color: color
			};
		} else {
			margin = { top: 80, right: 130, bottom: 100, left: 130 };
			width =
				Math.min(500, window.innerWidth - 50) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			barChartOptions = {
				w: width,
				h: height,
				margin: margin,
				maxValue: maxValue,
				color: color
			};
		}

		// Call function to draw the radar chart 
		if (data.length > 0) {
			this.BarChart(".compareBarChart", data, BarChartOptions, color);
		} else if (data.length === 0) {
			d3.select(".compareBarChart")
				.select("svg")
				.remove();
		}

		const svg = d3.select("compareBarChart")
	    .append("svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("margin-left", 100);
	                  
	    svg.selectAll("rect")
	      .data(data)
	      .enter()
	      .append("rect")
	      .attr("x", (d, i) => i * 70)
	      .attr("y", (d, i) => h - 10 * d)
	      .attr("width", 65)
	      .attr("height", (d, i) => d * 10)
	      .attr("fill", "green")
	}




	render() {
		return (
			<div>
				<div className="compareBarChart"/>
			</div>
		);
	}
}
