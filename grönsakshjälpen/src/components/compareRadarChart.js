import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class CompareRadarChart extends Component {
	constructor(props) {
		super(props);
		this.state = { dataLength: 0 };
	}

	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.data !== prevProps.data ||
		this.props.selectedOption !== prevProps.selectedOption) {
			this.DrawChart();
		}
	}


	calculateRanking = (vegetables, vegetable, index, selectedOption) => {
		// Pick out relevant data
		var data = vegetables.map(vegetableItem => {
			var filterIndex = selectedOption.index;
			var value;
			if (filterIndex.length === 2) {
				value =
					vegetableItem[index[0]][index[1]] /
					vegetableItem[filterIndex[0]][filterIndex[1]];
			} else if (filterIndex.length === 3) {
				value =
					vegetableItem[index[0]][index[1]] /
					vegetableItem[filterIndex[0]][filterIndex[1]][filterIndex[2]];
			}
			//console.log(value)
			return {
				id: vegetableItem.id,
				key: vegetableItem[index[0]],
				value: value
			};
		});
		//console.log(data)

		// Sort in descending order
		data.sort(function(a, b) {
			if (a.value > b.value) {
				return 1;
			}
			if (b.value > a.value) {
				return -1;
			}
			return 0;
		});

		var ranking;
		// Assign ranking
		var ranked = data.map(function(item, i) {
			if (i > 0) {
				var prevItem = data[i - 1];
				if (prevItem.value === item.value) {
					item.rank = prevItem.rank;
				} else {
					item.rank = i + 1;
				}
			} else {
				item.rank = 1;
			}
			if (vegetable.id === item.id) {
				ranking = item.rank;
			}
			return item;
		});
		console.log(ranked);
		return ranking;
	};

	DrawChart = () => {

		this.setState({dataLength: this.props.data.length})
		if (this.props.data.length > 0) {
		console.log("CHART DATA")
		console.log(this.props.data)
		// Data
		var data = this.props.data.map(vegetable => {
			return [
				{
					axis: "Energiförbrukning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["energy", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Växthusgasutsläpp",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["emissions", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Fossilutarmning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["fossil_depletion", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Markanvändning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["land_use", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Markförgiftning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["terrestrial_toxicity", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Markförsurning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["terrestrial_acidification", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Sötvattenförgiftning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["freshwater_toxicity", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Sötvattenförsurning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["freshwater_eutrophication", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Marinförsurning",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["marine_eutrophication", "value"],
						this.props.selectedOption
					)
				},
				{
					axis: "Vattenfotavtryck",
					value: this.calculateRanking(
						this.props.vegetables,
						vegetable,
						["water_footprint", "value"],
						this.props.selectedOption
					)
				}
			];
		});

		console.log(data)
	

		// Create color range
		var color = d3.scaleOrdinal().range(this.props.color);

		// Max value
		var maxValue = this.props.vegetables.length;

		// Init chart options
		var radarChartOptions;
		var margin;
		var width;
		var height;
		var labelFactor;
		if (window.innerWidth < 568) {
			margin = { top: 70, right: 90, bottom: 80, left: 90 };
			labelFactor = 1.5;
		} else {
			margin = { top: 70, right: 110, bottom: 80, left: 110 };
			labelFactor = 1.45;
		}
		width = Math.min(470, window.innerWidth) - margin.left - margin.right;
		height = Math.min(
			width,
			window.innerHeight - margin.top - margin.bottom - 20
		);
		radarChartOptions = {
			w: width,
			h: height,
			labelFactor: labelFactor,
			margin: margin,
			maxValue: maxValue,
			levels: 7,
			roundStrokes: true,
			color: color
		};

			

		// Call function to draw the radar chart 
	
			this.RadarChart(".compareRadarChart", data, radarChartOptions, color);
		} else if (this.props.data.length === 0) {
			d3.select(".compareRadarChart")
				.select("svg")
				.remove();


		}
	};

	

	responsivefy = svg => {
		// get container + svg aspect ratio
		var container = d3.select(svg.node().parentNode),
			width = parseInt(svg.style("width")),
			height = parseInt(svg.style("height")),
			aspect = width / height;

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
		d3.select(window).on("resize." + container.attr("class"), resize);

		// get width of container and resize svg to fit it
		function resize() {
			var targetWidth = parseInt(container.style("width"));
			svg.attr("width", targetWidth);
			svg.attr("height", Math.round(targetWidth / aspect));
		}
	};



	// Radar chart function
	RadarChart = (id, data, options, color) => {
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

		// Seetings for axises
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

		/* Create svg and g */

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
			.attr("class", "radar" + id)
			.call(this.responsivefy);

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


		/* Draw grid */

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

		/* Draw axis */

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
				return rScale(maxValue * 1) * Math.cos(angleSlice * i - Math.PI / 2);
			})
			.attr("y2", function(d, i) {
				return rScale(maxValue * 1) * Math.sin(angleSlice * i - Math.PI / 2);
			})
			.attr("class", "line")
			.style("stroke", "white")
			.style("stroke-width", "2px");

		//Append the labels at each axis
		axis
			.append("text")
			.attr("class", "axisLabel")
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

		/* Draw radar chart blobs */

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

		/* Append invisible circles for tooltip */

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
			.on("mouseover", function(d) {
				tooltip
					.transition()
					.duration(100)
					.style("opacity", 1);
				tooltip
					.html(d.value)
					.style("left", d3.event.pageX - 15 + "px")
					.style("top", d3.event.pageY - 50 + "px");
			})
			.on("mouseout", function(d) {
				tooltip
					.transition()
					.duration(100)
					.style("opacity", 0);
			});

	/* New tooltip */
	var tooltip = d3
	.select(".App")
.select(".tooltip")


		/* Help functions */

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

	// Update legend function
	updateLegend = color => {
		console.log(this.props.data.length);
		if (this.props.data.length > 0) {
			d3.select(".legendList").html("");
			var legendDiv = d3
				.select(".legendList")
				.append("div")
				.attr("class", "row col-md-12 mx-auto")
				.selectAll("div")
				.data(this.props.data)
				.enter()
				.append("div")
				.attr("class", "legendItem col-md-3 col-4 py-1")
				.append("div")
				.attr("class", "row");

			legendDiv
				.append("div")
				.attr("class", "legendColor col-1 p-2")
				.style("background", function(d, i) {
					return color(i);
				});

			legendDiv
				.append("p")
				.attr("class", "legendText col")
				.text(function(d) {
					return d.name_swe;
				})
				.style("font-size", "0.8rem");
		} else {
			d3.select(".legendList").html("");
		}
	};

	render() {
		return (
			<div className="compareRadarChartContainer p-0">
				{this.state.dataLength > 0 ? 
				<h3>Grönsaksranking</h3> : null}
				<div className="compareRadarChart p-0" />
			</div>
		);
	}
}
