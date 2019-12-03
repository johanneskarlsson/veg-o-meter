import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class RadarChart extends Component {
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
		//////////////////////////////////////////////////////////////
		////////////////////////// Data //////////////////////////////
		//////////////////////////////////////////////////////////////
		var data = this.props.data.map(vegetable => {
			return [
				{ axis: "Energiförbrukning", value: vegetable.energy.ranking },
				{ axis: "Växthusgasutsläpp", value: vegetable.emissions.ranking },
				{ axis: "Fossilutarmning", value: vegetable.fossil_depletion.ranking },
				{ axis: "Markanvändning", value: vegetable.land_use.ranking },
				{
					axis: "Markförsurning",
					value: vegetable.terrestrial_toxicity.ranking
				},
				{
					axis: "Markförgiftning",
					value: vegetable.terrestrial_acidification.ranking
				},
				{
					axis: "Sötvattenförgiftning",
					value: vegetable.freshwater_toxicity.ranking
				},
				{
					axis: "Sötvattenförsurning",
					value: vegetable.freshwater_eutrophication.ranking
				},
				{
					axis: "Marinförsurning",
					value: vegetable.marine_eutrophication.ranking
				},
				{ axis: "Vattenfotavtryck", value: vegetable.water_footprint.ranking }
			];
		});

		//////////////////////////////////////////////////////////////
		//////////////////// Draw the Chart //////////////////////////
		//////////////////////////////////////////////////////////////
		var color = d3.scaleOrdinal().range(["red", "green", "yellow", "blue"]);

		var radarChartOptions;
		var margin;
		var width;
		var height;

		if (window.innerWidth < 576) {
			margin = { top: 50, right: 80, bottom: 70, left: 80 };
			width = Math.min(600, window.innerWidth-20) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			radarChartOptions = {
				w: width,
				h: height,
				labelFactor: 1.4,
				margin: margin,
				maxValue: 21,
				levels: 7,
				roundStrokes: true,
				color: color
			};
		} else {
			margin = { top: 100, right: 130, bottom: 130, left: 130 };
			width = Math.min(600, window.innerWidth-50) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			radarChartOptions = {
				w: width,
				h: height,
				labelFactor: 1.4,
				margin: margin,
				maxValue: 21,
				levels: 7,
				roundStrokes: true,
				color: color
			};
		}

		//Call function to draw the Radar chart
		if (data.length > 0) {
			this.RadarChart(".radarChart", data, radarChartOptions);
		} else if (data.length === 0) {
			d3.select(".radarChart")
				.select("svg")
				.remove();

			d3.select(".legendList").html("");
		}
	};

	RadarChart = (id, data, options) => {
		var cfg = {
			w: 100, //Width of the circle
			h: 100, //Height of the circle
			margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
			levels: 10, //How many levels or inner circles should there be drawn
			maxValue: 21, //What is the value that the biggest circle will represent
			labelFactor: 1.2, //How much farther than the radius of the outer circle should the labels be placed
			wrapWidth: 150, //The number of pixels after which a label needs to be given a new line
			opacityArea: 0.3, //The opacity of the area of the blob
			dotRadius: 4, //The size of the colored circles of each blog
			opacityCircles: 0.1, //The opacity of the circles of each blob
			strokeWidth: 2, //The width of the stroke around each blob
			roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
			color: d3.scaleOrdinal(d3.schemeCategory10) //Color function
		};

		this.updateLegend();

		//Put all of the options into a variable called cfg
		if ("undefined" !== typeof options) {
			for (var i in options) {
				if ("undefined" !== typeof options[i]) {
					cfg[i] = options[i];
				}
			} //for i
		} //if

		//If the supplied maxValue is smaller than the actual one, replace by the max in the data
		var maxValue = Math.max(
			cfg.maxValue,
			d3.max(data, function(i) {
				return d3.max(
					i.map(function(o) {
						return o.value;
					})
				);
			})
		);

		var allAxis = data[0].map(function(i, j) {
				return i.axis;
			}), //Names of each axis
			total = allAxis.length, //The number of different axes
			radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
			Format = d3.format(""), //Percentage formatting
			angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

		//Scale for the radius
		var rScale = d3
			.scaleLinear()
			.range([0, radius])
			.domain([0, maxValue]);

		/////////////////////////////////////////////////////////
		//////////// Create the container SVG and g /////////////
		/////////////////////////////////////////////////////////

		//Remove whatever chart with the same id/class was present before
		d3.select(id)
			.select("svg")
			.remove();

		//Initiate the radar chart SVG
		var svg = d3
			.select(id)
			.append("svg")
			.attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "svg-content")
			.attr("class", "radar" + id);

		//Append a g element
		var g = svg
			.append("g")
			.attr(
				"transform",
				"translate(" +
					(cfg.w / 2 + cfg.margin.left) +
					"," +
					(cfg.h / 2 + cfg.margin.top) +
					")"
			);

		/////////////////////////////////////////////////////////
		/////////////// Draw the Circular grid //////////////////
		/////////////////////////////////////////////////////////

		//Wrapper for the grid & axes
		var axisGrid = g.append("g").attr("class", "axisWrapper");

		//Draw the background circles
		axisGrid
			.selectAll(".levels")
			.data(d3.range(1, cfg.levels + 1).reverse())
			.enter()
			.append("circle")
			.attr("class", "gridCircle")
			.attr("r", function(d, i) {
				return (radius / cfg.levels) * d;
			})
			.style("fill", "#CDCDCD")
			.style("stroke", "#CDCDCD")
			.style("fill-opacity", cfg.opacityCircles);

		//Text indicating at what % each level is
		axisGrid
			.selectAll(".axisLabel")
			.data(d3.range(1, cfg.levels + 1).reverse())
			.enter()
			.append("text")
			.attr("class", "axisLabel")
			.attr("x", 4)
			.attr("y", function(d) {
				return (-d * radius) / cfg.levels;
			})
			.attr("dy", "0.4em")
			.style("font-size", "10px")
			.attr("fill", "#737373")
			.text(function(d, i) {
				return Format((maxValue * d) / cfg.levels);
			});

		/////////////////////////////////////////////////////////
		//////////////////// Draw the axes //////////////////////
		/////////////////////////////////////////////////////////

		//Create the straight lines radiating outward from the center
		var axis = axisGrid
			.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

		//Append the lines
		axis
			.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", function(d, i) {
				return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
			})
			.attr("y2", function(d, i) {
				return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
			})
			.attr("class", "line")
			.style("stroke", "white")
			.style("stroke-width", "2px");

		//Append the labels at each axis
		axis
			.append("text")
			.attr("class", "legend")
			.style("font-size", "0.7rem")
			.attr("text-anchor", "middle")
			.attr("dy", "0.35em")
			.attr("x", function(d, i) {
				return (
					rScale(maxValue * cfg.labelFactor) *
					Math.cos(angleSlice * i - Math.PI / 2)
				);
			})
			.attr("y", function(d, i) {
				return (
					rScale(maxValue * cfg.labelFactor) *
					Math.sin(angleSlice * i - Math.PI / 2)
				);
			})
			.text(function(d) {
				return d;
			})
			.call(wrap, cfg.wrapWidth);

		/////////////////////////////////////////////////////////
		///////////// Draw the radar chart blobs ////////////////
		/////////////////////////////////////////////////////////

		//The radial line function
		var radarLine = d3
			.lineRadial()
			.curve(d3.curveBasisClosed)
			.radius(function(d) {
				return rScale(d.value);
			})
			.angle(function(d, i) {
				return i * angleSlice;
			});

		if (cfg.roundStrokes) {
			radarLine.curve(d3.curveCardinalClosed);
		}

		//Create a wrapper for the blobs
		var blobWrapper = g
			.selectAll(".radarWrapper")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "radarWrapper");

		//Append the backgrounds
		blobWrapper
			.append("path")
			.attr("class", "radarArea")
			.attr("d", function(d, i) {
				return radarLine(d);
			})
			.style("fill", function(d, i) {
				return cfg.color(i);
			})
			.style("fill-opacity", cfg.opacityArea)
			.on("mouseover", function(d, i) {
				//Dim all blobs
				d3.selectAll(".radarArea")
					.transition()
					.duration(200)
					.style("fill-opacity", 0.1);
				//Bring back the hovered over blob
				d3.select(this)
					.transition()
					.duration(200)
					.style("fill-opacity", 0.7);
			})
			.on("mouseout", function() {
				//Bring back all blobs
				d3.selectAll(".radarArea")
					.transition()
					.duration(200)
					.style("fill-opacity", cfg.opacityArea);
			});

		//Create the outlines
		blobWrapper
			.append("path")
			.attr("class", "radarStroke")
			.attr("d", function(d, i) {
				return radarLine(d);
			})
			.style("stroke-width", cfg.strokeWidth + "px")
			.style("stroke", function(d, i) {
				return cfg.color(i);
			})
			.style("fill", "none");

		//Append the circles
		blobWrapper
			.selectAll(".radarCircle")
			.data(function(d, i, j) {
				console.log(i);
				return d;
			})
			.enter()
			.append("circle")

			.attr("class", "radarCircle")
			.attr("r", cfg.dotRadius)
			.attr("cx", function(d, i) {
				return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
			})
			.attr("cy", function(d, i) {
				return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
			})
			.style("fill-opacity", 0.8);

		/////////////////////////////////////////////////////////
		//////// Append invisible circles for tooltip ///////////
		/////////////////////////////////////////////////////////

		//Wrapper for the invisible circles on top
		var blobCircleWrapper = g
			.selectAll(".radarCircleWrapper")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "radarCircleWrapper");

		//Append a set of invisible circles on top for the mouseover pop-up
		blobCircleWrapper
			.selectAll(".radarInvisibleCircle")
			.data(function(d, i) {
				return d;
			})
			.enter()
			.append("circle")
			.attr("class", "radarInvisibleCircle")
			.attr("r", cfg.dotRadius * 1.5)
			.attr("cx", function(d, i) {
				return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
			})
			.attr("cy", function(d, i) {
				return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
			})
			.style("fill", "none")
			.style("pointer-events", "all")
			.on("mouseover", function(d, i) {
				this.newX = parseFloat(d3.select(this).attr("cx")) - 10;
				this.newY = parseFloat(d3.select(this).attr("cy")) - 20;

				tooltip
					.attr("x", this.newX)
					.attr("y", this.newY)
					.text(Format(d.value))
					.transition()
					.duration(200)
					.style("opacity", 1);
			})
			.on("mouseout", function() {
				tooltip
					.transition()
					.duration(200)
					.style("opacity", 0);
			});

		//Set up the small tooltip for when you hover over a circle
		var tooltip = g
			.append("text")
			.attr("class", "tooltip")
			.style("opacity", 0);

		/////////////////////////////////////////////////////////
		/////////////////// Helper Function /////////////////////
		/////////////////////////////////////////////////////////

		//Taken from http://bl.ocks.org/mbostock/7555321
		//Wraps SVG text
		function wrap(text, width) {
			text.each(function() {
				var text = d3.select(this),
					words = text
						.text()
						.split(/\s+/)
						.reverse(),
					word,
					line = [],
					lineNumber = 0,
					lineHeight = 1.4, // ems
					y = text.attr("y"),
					x = text.attr("x"),
					dy = parseFloat(text.attr("dy")),
					tspan = text
						.text(null)
						.append("tspan")
						.attr("x", x)
						.attr("y", y)
						.attr("dy", dy + "em");

				while ((word = words.pop())) {
					line.push(word);
					tspan.text(line.join(" "));
					if (tspan.node().getComputedTextLength() > width) {
						line.pop();
						tspan.text(line.join(" "));
						line = [word];
						tspan = text
							.append("tspan")
							.attr("x", x)
							.attr("y", y)
							.attr("dy", ++lineNumber * lineHeight + dy + "em")
							.text(word);
					}
				}
			});
		} //wrap
	}; //RadarChart

	updateLegend = () => {
		var color = d3.scaleOrdinal().range(["red", "green", "yellow", "blue"]);
		console.log(this.props.data.length);
		if (this.props.data.length > 1) {
			d3.select(".legendList").html("");
			var legendDiv = d3
				.select(".legendList")
				.append("div")
				.attr("class", "row col-md-8 mx-auto")
				.selectAll("div")
				.data(this.props.data)
				.enter()
				.append("div")
				.attr("class", "legendItem row mx-auto");

			legendDiv
				.append("div")
				.attr("class", "legendColor col-1 p-2")
				.style("background", function(d, i) {
					return color(i);
				});

			legendDiv
				.append("p")
				.attr("class", "col")
				.text(function(d) {
					return d.name_swe;
				});
		} else {
			d3.select(".legendList").html("");
		}
	};

	render() {
		return (
			<div>
				<div className="radarChart" />
				<div className="legendList"></div>
			</div>
		);
	}
}
