import React, { Component } from "react";
import * as d3 from "d3";

export default class DetailDonutChart extends Component {
	componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props !== prevProps) {
			//console.log("updated");
			this.DrawChart();
		}
	}

	newValueFiltered = (value, filteredValue) => {
		var newValue = Math.round((value / filteredValue) * 10000) / 10000;
		return newValue;
	};

	DrawChart = () => {
		console.log(this.props.data);
		var vegetable = this.props.data[0];
		var option = this.props.selectedOption;
		var lengthKey = option.index.length;
		var filteredValue;
		if (lengthKey === 2) {
			filteredValue = vegetable[option.index[0]][option.index[1]];
		} else if (lengthKey === 3) {
			filteredValue =
				vegetable[option.index[0]][option.index[1]][option.index[2]];
		}

		if (this.props.data.length === 1 && filteredValue !== 0) {
			const total =
				Math.round(
					((vegetable.nutrition.carbohydrates.value +
						vegetable.nutrition.protein.value +
						vegetable.nutrition.fat.value +
						vegetable.nutrition.fiber.value +
						vegetable.nutrition.water.value +
						vegetable.nutrition.ash.value) /
						filteredValue) *
						10000
				) / 10000;
			var data = [
				{
					title: "Kolhydrater",
					value: this.newValueFiltered(
						vegetable.nutrition.carbohydrates.value,
						filteredValue
					),
					all: total
				},
				{
					title: "Protein",
					value: this.newValueFiltered(
						vegetable.nutrition.protein.value,
						filteredValue
					),
					all: total
				},
				{
					title: "Fett",
					value: this.newValueFiltered(
						vegetable.nutrition.fat.value,
						filteredValue
					),
					all: total
				},
				{
					title: "Fibrer",
					value: this.newValueFiltered(
						vegetable.nutrition.fiber.value,
						filteredValue
					),
					all: total
				},
				{
					title: "Vatten",
					value: this.newValueFiltered(
						vegetable.nutrition.water.value,
						filteredValue
					),
					all: total
				},
				{
					title: "Aska",
					value: this.newValueFiltered(
						vegetable.nutrition.ash.value,
						filteredValue
					),
					all: total
				}
			];

			//Remove no data text
			d3.select(".detailDonutChartContainer")
				.select(".no-data-donut")
				.remove();
			this.DonutChart(".detailDonutChart", data);
		} else {
			console.log("NO DATA");
			d3.select(".detailDonutChartContainer")
				.select(".no-data-donut")
				.remove();
			d3.select(".detailDonutChart")
				.select("svg")
				.remove();
			d3.select(".detailDonutChartContainer")
				.append("h2")
				.attr("class", "p-3 no-data-donut")
				.text("Näringsämnet saknas i grönsaken");
		}
	};

	responsivefy = svg => {
		// get container + svg aspect ratio
		var container = d3.select(svg.node().parentNode),
			width = parseInt(svg.style("width")),
			height = parseInt(svg.style("height")),
			aspect = width / height;

		console.log(container);
		console.log("width: " + width);
		console.log("height: " + height);

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
			//console.log("Container: " + container);
			var targetWidth = parseInt(container.style("width"));
			//console.log("Targetwidth: " + targetWidth);
			svg.attr("width", targetWidth);
			svg.attr("height", Math.round(targetWidth / aspect));

			console.log("resize called");
		}
	};

	DonutChart = (id, data) => {
		//console.log(data);
		var width = 280;
		var height = 280;
		var radius = Math.min(width, height) / 2;
		var donutWidth = 45;
		var color = d3
			.scaleOrdinal()
			.range(["green", "red", "yellow", "brown", "blue", "grey"]);

		d3.select(id)
			.select("svg")
			.remove();

		var svg = d3
			.select(id)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.call(this.responsivefy)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		var arc = d3
			.arc()
			.innerRadius(radius - donutWidth)
			.outerRadius(radius);

		var pie = d3
			.pie()
			.value(function(d) {
				return d.value;
			})
			.sort(null);

		var legendRectSize = 13;
		var legendSpacing = 6;

		/* New tooltip */
		var tooltip = d3.select(".App").select(".tooltip");

		svg
			.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", function(d, i) {
				return color(d.data.title);
			})
			.attr("opacity", "1")
			.attr("transform", "translate(0, 0)")
			.on("mousemove", function(d, i) {
				d3.select(this)
					.transition()
					.duration("50")
					.attr("opacity", ".5");
				tooltip
					.transition()
					.duration(50)
					.style("opacity", 1);

				let num =
					(
						Math.round(
							(parseFloat(d.value) / parseFloat(d.data.all)) * 100 * 10
						) / 10
					).toString() + "%";
				let value = d.value.toString() + " gram (" + num + ")";
				tooltip
					.html(value)
					.style("left", d3.event.pageX - 15 + "px")
					.style("top", d3.event.pageY - 50 + "px");
			})
			.on("mouseout", function(d, i) {
				d3.select(this)
					.transition()
					.duration(50)
					.attr("opacity", "1");
				tooltip
					.transition()
					.duration(50)
					.style("opacity", 0);
			});

		var legend = svg
			.selectAll(".legend")
			.data(color.domain())
			.enter()
			.append("g")
			.attr("class", "square-legend")
			.attr("transform", function(d, i) {
				var height = legendRectSize + legendSpacing;
				var offset = (height * color.domain().length) / 2;
				var horz = -2 * legendRectSize - 15;
				var vert = i * height - offset + 8;
				return "translate(" + horz + "," + vert + ")";
			});

		legend
			.append("rect")
			.style("fill", color)
			.style("stroke", color)
			.attr("x", "-4px")
			.attr("y", "-6px")
			.attr("width", "15px")
			.attr("height", "15px");

		legend
			.append("text")
			.attr("x", legendRectSize + legendSpacing)
			.attr("y", legendRectSize - legendSpacing)
			.text(function(d) {
				return d;
			})
			.style("font-size", "14px");
	};

	render() {
		console.log("RENDERED");
		return (
			<div className="detailDonutChartContainer p-0">
				<div className="detailDonutChart p-0 mb-3" />
			</div>
		);
	}
}
