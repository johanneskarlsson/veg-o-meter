import React, { Component } from "react";
import * as d3 from "d3";

// https://medium.com/front-end-weekly/simplest-way-to-build-responsive-d3-chart-in-react-d63d3b78b691

export default class CompareBarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			legend: null,
			yAxisAttribute: "axis",
			xAxisAttribute: "value",
			width: 1000,
			height: 400
		};
	}

	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.filter !== prevProps.filter || this.props.data !== prevProps.data ) {
			this.DrawChart();
		}
	}

	componentDidMount = () => {
		this.DrawChart();
	};

	DrawChart = () => {
		d3.select(".compareBarChart")
				.select("svg")
				.remove();
		// Data
		var data = [];
		if (this.props.filter.length === 1){
			data = this.props.data.map(vegetable => {
				return {
					axis: vegetable.name_swe,
					filteredData: this.props.filter[0].value,
					value: vegetable[this.props.filter[0].value].value
				}
			})
		}

		let margin = { top: 20, right: 30, bottom: 40, left: 90 },
			width = this.state.width - margin.left - margin.right,
			height = this.state.height - margin.top - margin.bottom;

		// Call function to draw the bar chart
		if (data.length > 0) {
			this.BarChart(".compareBarChart", data, margin, width, height);
		} else if (data.length === 0) {
			d3.select(".compareBarChart")
				.select("svg")
				.remove();
		}
	};



	// Bar chart function
	BarChart = (id, data, margin, width, height) => {

		// append the svg object to the body of the page
		let svg = d3
			.select(id)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.call(this.responsivefy)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		// Add X axis
		let x = d3
			.scaleLinear()
			.domain([0, 10])
			.range([0, width]);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.attr("class", "axis x")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");
		// Add Y axis
		let y = d3
			.scaleBand()
			.range([0, height])
			.domain(data.map(d => d[this.state.yAxisAttribute]))
			//.domain(data.map((d) =>  d[this.state.yAxisAttribute]))
			.padding(0.1);
		svg
			.append("g")
			.attr("class", "axis y")
			.call(d3.axisLeft(y))
			.selectAll("text")
			.attr("dy", null);
		// Add Bars
		svg
			.selectAll("myRect")
			.data(data)
			.enter()
			.append("rect")
			.on("mouseover", function() {
				d3.select(this).style("opacity", 0.5);
			})
			.on("mouseout", function() {
				d3.select(this).style("opacity", 1);
			})
			.attr("x", x(0))
			//.attr("y", (d) => y(d[this.state.yAxisAttribute]))
			.attr("y", d => y(d[this.state.yAxisAttribute]))
			.attr("width", 0)
			.attr("height", y.bandwidth() - 10)
			.attr("fill", "#DF337D")
			.transition(d3.transition().duration(1000))
			//.attr("width", (d) => x(d[this.state.xAxisAttribute]))
			.attr("width", d => x(d[this.state.xAxisAttribute]));
	};


	responsivefy = (svg) => {
	    // get container + svg aspect ratio
	    var container = d3.select(svg.node().parentNode),
	        width = parseInt(svg.style("width")),
	        height = parseInt(svg.style("height")),
	        aspect = width / height;

	    // add viewBox and preserveAspectRatio properties,
	    // and call resize so that svg resizes on inital page load
	    svg.attr("viewBox", "0 0 " + width + " " + height)
	        .attr("perserveAspectRatio", "xMinYMid")
	        .call(resize);

	    // to register multiple listeners for same event type, 
	    // you need to add namespace, i.e., 'click.foo'
	    // necessary if you call invoke this function for multiple svgs
	    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
	    d3.select(window).on("resize." + container.attr("id"), resize);

	    // get width of container and resize svg to fit it
	    function resize() {
	        var targetWidth = parseInt(container.style("width"));
	        svg.attr("width", targetWidth);
	        svg.attr("height", Math.round(targetWidth / aspect));
	    }
	}
	
	render() {
		return (
				<div className="col p-0 compareBarChart" />
		);
	}
}
