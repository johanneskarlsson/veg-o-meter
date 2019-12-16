import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class ColorLegend extends Component {
	constructor(props) {
		super(props);
		this.state = { legend: null };
	}

	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.data !== prevProps.data) {
            var color = d3.scaleOrdinal().range(this.props.color);
            this.updateLegend(color, this.props.data);
		}
	}

	// Update legend function
	updateLegend = (color, data) => {
		console.log(data.length);
		if (data.length > 0) {
			d3.select(".legendList").html("");
			var legendDiv = d3
				.select(".legendList")
				.append("div")
				.attr("class", "row col-md-12 m-0 justify-content-md-center")
				.selectAll("div")
				.data(data)
				.enter()
				.append("div")
				.attr("class", "legendItem col-md-2 col-4 py-1")
				.append("div")
				.attr("class", "row");

			legendDiv
				.append("div")
				.attr("class", "legendColor")
				.style("background", function(d, i) {
					return color(i);
				});

			legendDiv
				.append("p")
				.attr("class", "legendText text-left col")
				.text(function(d) {
					return d.name_swe;
				})
				.style("font-size", "0.8rem");
		} else {
			d3.select(".legendList").html("");
		}
	};

	render() {
		return <div className="legendList col-md-9 mx-auto m-0 p-3" />;
	}
}
