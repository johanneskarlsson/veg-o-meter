import React, { Component } from "react";
import * as d3 from "d3";
import Select from "react-select";

// https://medium.com/front-end-weekly/simplest-way-to-build-responsive-d3-chart-in-react-d63d3b78b691

export default class CompareBarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: { label: "Växthusgasutsläpp", value: "emissions" },
			key: [
				{ label: "Växthusgasutsläpp", value: "emissions" },
				{ label: "Vattenfotavtryck", value: "water_footprint" },
				{ label: "Energiförbrukning", value: "energy" },
				{ label: "Markanvändning", value: "land_use" },
				{ label: "Fossil utarmning", value: "fossil_depletion" },
				{ label: "Sötvattenförgiftning", value: "freshwater_toxicity" },
				{ label: "Sötvattenförsurning", value: "freshwater_eutrophication" },
				{ label: "Marinförsurning", value: "marine_eutrophication" },
				{ label: "Markförsurning", value: "terrestrial_toxicity" },
				{ label: "Markförgiftning", value: "terrestrial_acidification" }
			],
			dataLength: 0
		};
	}

	handleChange = selectedOption => {
		console.log(`Option selected:`, selectedOption);
		this.setState({ selectedOption: selectedOption }, this.DrawChart);
	};

	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (
			this.props.selectedOption !== prevProps.selectedOption ||
			this.props.data !== prevProps.data
		) {
			this.DrawChart();
		}
	}

	responsivefy = svg => {
		// get container + svg aspect ratio
		var container = d3.select(svg.node().parentNode),
			width = parseInt(svg.style("width")),
			height = parseInt(svg.style("height")),
			aspect = width / height;

			console.log(width)
			console.log(height)

		// add viewBox and preserveAspectRatio properties,
		// and call resize so that svg resizes on inital page load
		svg
			.attr("viewBox", "0 0 " + width + " " + height)
			.attr("perserveAspectRatio", "xMinYMid")
			.call(resize);

		// to register multiple listeners for same event type,
		// you need to add namespace, i.e., 'click.foo'
		// necessary if you call invoke this function for multiple svgs
		// api docs: https://github.com/mbostock/d3/wiki/Selections#on
		d3.select(window).on("resize." + container.attr("id"), resize);

		// get width of container and resize svg to fit it
		function resize() {
			console.log("resize")
			var targetWidth = parseInt(container.style("width"));
			svg.attr("width", targetWidth);
			svg.attr("height", Math.round(targetWidth / aspect));
		}
	};

	newValueFiltered = (value, filteredValue) => {
		var newValue;
		if(filteredValue === 0){
			newValue = 0;
		} else {
		newValue = Math.round((value / filteredValue) * 10000) / 10000;
	}
		return newValue;
	};

	DrawChart = () => {
		d3.select(".compareBarChart")
			.select("svg")
			.remove();
		// Data
		this.setState({ dataLength: this.props.data.length });
		var data = [];
		if (this.props.data.length >= 1) {
			console.log(this.props.data);
			console.log(this.state.selectedOption);
			var unit = this.props.data[0][this.state.selectedOption.value].unit;

			data = this.props.data.map(vegetable => {
				var option = this.props.selectedOption;
		var lengthKey = option.index.length;
		var filteredValue;
		if (lengthKey === 2) {
			filteredValue = vegetable[option.index[0]][option.index[1]];
		} else if (lengthKey === 3) {
			filteredValue =
				vegetable[option.index[0]][option.index[1]][option.index[2]];
		}

				return {
					axis: vegetable.name_swe,
					value: this.newValueFiltered(vegetable[this.state.selectedOption.value].value, filteredValue)
				};
			});


		var color = d3.scaleOrdinal().range(this.props.color);

			let margin;
			if (window.innerWidth < 568) {
				margin = { top: 10, right: 50, bottom: 120, left: 120 };
			} else {
				margin = { top: 10, right: 50, bottom: 140, left: 120 };
			}
			var width = 650 - margin.left - margin.right;
			var height = 580 - margin.top - margin.bottom;

		
			this.BarChart(".compareBarChart", data, margin, width, height, unit, color);
		} else if (data.length === 0) {
			d3.select(".compareBarChart")
				.select("svg")
				.remove();

		}
	};

	// Bar chart function
	BarChart = (id, data, margin, width, height, unit, color) => {
		// append the svg object to the body of the page

		let svg = d3
			.select(id)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.call(this.responsivefy)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var yAxisAttribute = "axis";
		var xAxisAttribute = "value";

		// Add X axis
		let x = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(data, function(d) {
					return d.value;
				})
			])
			.range([0, width]);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.attr("class", "axis-x axisLabel")
			.call(d3.axisBottom(x).ticks(5))
			.selectAll("text")
			.attr("transform", "translate(0,10)")
			.style("text-anchor", "middle");

		// Add Y axis
		let y = d3
			.scaleBand()
			.range([0, height])
			.domain(data.map(d => d[yAxisAttribute]))
			//.domain(data.map((d) =>  d[this.state.yAxisAttribute]))
			.padding(0.2);
		svg
			.append("g")
			.attr("class", "axis-y")
			.call(d3.axisLeft(y))
			.selectAll("text")
			.attr("transform", "translate(-10,5)")
			.attr("class", "axisLabel")
			.attr("dy", null);
			
		// Add Bars
		svg
			.selectAll("myRect")
			.data(data)
			.enter()
			.append("rect")
		
			.on("mousemove", function(d) {
				d3.select(this).style("opacity", 0.5);
				tooltip
	
					.style("opacity", 1);
				tooltip
					.html(d.value)
					.style("left", d3.event.pageX - 15 + "px")
					.style("top", d3.event.pageY - 50 + "px");
			})
			.on("mouseout", function() {
				d3.select(this).style("opacity", 1);
				tooltip
					.style("opacity", 0);
			})
			.attr("x", x(0))
			//.attr("y", (d) => y(d[this.state.yAxisAttribute]))
			.attr("y", d => y(d[yAxisAttribute]))
			.attr("width", 0)
			.style("fill", function(d, i) {
				return color(i);
			})
			.attr("height", y.bandwidth())
			.transition(d3.transition().duration(500))
			//.attr("width", (d) => x(d[this.state.xAxisAttribute]))
			.attr("width", d => x(d[xAxisAttribute]));


		
		// text label for the x axis
		svg
			.append("text")
			.attr(
				"transform",
				"translate(" + width / 2 + " ," + (height + margin.bottom/2 +20) + ")"
			)
			.style("text-anchor", "middle")
			.attr("class", "barChart-XAxis")
			.text(unit);

	/* New tooltip */
	var tooltip = d3
	.select(".App")
	.select(".tooltip")
	};

	render() {
		return (
			<div className="compareBarChartContainer p-0">
				{this.state.dataLength > 0 ? (
					<div className="chartHeader">
						<h3>Klimatavtryck</h3>
					<Select
						className="m-3 col-md-8 mx-auto"
						value={this.state.selectedOption}
						onChange={this.handleChange}
						options={this.state.key}
						placeholder={"Filtrera efter..."}
						noOptionsMessage={() => {
							return "Ingen träff";
						}}
					/></div>
				) : null}
				<div className="p-0 compareBarChart" />
			</div>
		);
	}
}
