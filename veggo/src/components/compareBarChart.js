import React, { Component } from "react";
import * as d3 from "d3";

// D3-code from Nadieh Bremer at http://bl.ocks.org/nbremer/21746a9668ffdf6d8242

export default class CompareBarChart extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			legend: null,
			yAxisAttribute: "axis",
            xAxisAttribute: "value",
            selectedData: "",
            width: 1000,
            height: 400
        };
        this.chartRef = React.createRef();
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
			console.log(Object.keys(vegetable));
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


		
		let margin = {top: 20, right: 30, bottom: 40, left: 90},
		            width = this.state.width - margin.left - margin.right,
		            height = this.state.height - margin.top - margin.bottom;

		
		// Call function to draw the radar chart 
		if (data.length > 0) {
			this.BarChart(data, margin, width, height);
		} else if (data.length === 0) {
			d3.select(".compareBarChart")
				.select("svg")
				.remove();
		}
	}

	// Bar chart function
	BarChart = (data, margin, width, height) => {

		// append the svg object to the body of the page
		let svg = d3.select(".compareBarChart")
		        .append("svg")
		        .attr("width", width + margin.left + margin.right)
		        .attr("height", height + margin.top + margin.bottom)
		        .append("g")
		        .attr("transform",
		        "translate(" + margin.left + "," + margin.top + ")");
		// Add X axis
		let x = d3.scaleLinear()
		        .domain([0, 100])
		        .range([ 0, width]);
		svg.append("g")
		        .attr("transform", "translate(0," + height + ")")
		        .attr('class','axis x')
		        .call(d3.axisBottom(x))
		        .selectAll("text")
		        .attr("transform", "translate(-10,0)rotate(-45)")
		        .style("text-anchor", "end");
		// Add Y axis
		let y = d3.scaleBand()
		        .range([ 0, height ])
		        .domain(data.map((d) =>  d[this.state.yAxisAttribute]))
		        //.domain(data.map((d) =>  d[this.state.yAxisAttribute]))
		        .padding(.1);
		svg.append("g")
		        .attr('class','axis y')
		        .call(d3.axisLeft(y))
		        .selectAll("text")
		        .attr("dy", null)
		// Add Bars
		svg.selectAll("myRect")
		        .data(data)
		        .enter()
		        .append("rect")
		        .on('mouseover', function(){
		            d3.select(this).style('opacity', 0.5)
		         })
		        .on('mouseout', function(){
		            d3.select(this).style('opacity', 1)
		         })
		        .attr("x", x(0) )
		        //.attr("y", (d) => y(d[this.state.yAxisAttribute]))
		        .attr("y", (d) => y(d[this.state.yAxisAttribute]))
		        .attr("width", 0)
		        .attr("height", y.bandwidth() -10 )
		        .attr("fill", "#DF337D")
		        .transition(d3.transition().duration(1000))
		        //.attr("width", (d) => x(d[this.state.xAxisAttribute]))
		        .attr("width", (d) => x(d[this.state.xAxisAttribute]))
		}

		

	render() {
		return (
			<div>
				<div className="compareBarChart"/>
			</div>
		);
	}
}
