import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class DetailRadarChart extends Component {
	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.data !== prevProps.data) {
			console.log("updated");
			 // Fix to solve auto resize on initial load
            setTimeout(() => {
                this.DrawChart(); 
            }, 200);
		}
	}

	DrawChart = () => {
		console.log("CHART DATA");
		console.log(this.props.data);
		// Data
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

		// Color list
		var colorList = ["red"];

		// Create color range
		var color = d3.scaleOrdinal().range(colorList);

		// Max value
		var maxValue = this.props.vegetables.length;

		// Init chart options
		var radarChartOptions;
		var margin;
		var width;
		var height;

		// Settings on mobile and desktop
		if (window.innerWidth < 576) {
			margin = { top: 40, right: 90, bottom: 70, left: 90 };
			width =
				Math.min(450, window.innerWidth) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			radarChartOptions = {
				w: width,
				h: height,
				labelFactor: 1.4,
				margin: margin,
				maxValue: maxValue,
				levels: 7,
				roundStrokes: true,
				color: color
			};
		} else {
			margin = { top: 60, right: 110, bottom: 110, left: 110 };
			width =
				Math.min(470, window.innerWidth) - margin.left - margin.right;
			height = Math.min(
				width,
				window.innerHeight - margin.top - margin.bottom - 20
			);

			radarChartOptions = {
				w: width,
				h: height,
				labelFactor: 1.4,
				margin: margin,
				maxValue: maxValue,
				levels: 7,
				roundStrokes: true,
				color: color
			};
		}

		// Call function to draw the radar chart
		if (data.length === 1) {
			this.RadarChart(".detailRadarChart", data, radarChartOptions, color);
		} else if (data.length === 0) {
			d3.select(".detailRadarChart")
				.select("svg")
				.remove();

			d3.select(".legendList").html("");
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
			.attr("class", "legend")
			.style("font-size", "0.75rem")
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

	render() {
		return <div className="detailRadarChart col-12 p-0" />;
	}
}
