import React, { Component } from 'react'
import * as d3 from "d3";

export default class DetailDonutChart extends Component {

    componentDidUpdate(prevProps) {
		// If the component receives new props
		if (this.props.data !== prevProps.data) {
			this.DrawChart();
		}
	}

    componentDidMount = () => {
        this.DrawChart();
    }

    DrawChart = () => {

        console.log(this.props.data)
    

        if (this.props.data.length === 1) {
            var vegetable = this.props.data[0];
            const total = vegetable.nutrition.carbohydrates.value + vegetable.nutrition.protein.value + vegetable.nutrition.fat.value + vegetable.nutrition.fiber.value + vegetable.nutrition.water.value + vegetable.nutrition.ash.value;
            var data = [
                
                    { title: "Kolhydrater", value: vegetable.nutrition.carbohydrates.value, all: total },
                    { title: "Protein", value: vegetable.nutrition.protein.value, all: total },
                    { title: "Fett", value: vegetable.nutrition.fat.value, all: total },
                    { title: "Fibrer", value: vegetable.nutrition.fiber.value, all: total },
                    { title: "Vatten", value: vegetable.nutrition.water.value, all: total },
                    { title: "Aska", value: vegetable.nutrition.ash.value, all: total }
            ]

			this.DonutChart(".detailDonutChart", data);
		} 
    }



        
    DonutChart = (id, data) => {    
    
    console.log(data)
  
    var width = 285;
    var height = 285;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 50;
    var color = d3.scaleOrdinal()
        .range([
        "green","red",
        "yellow", "brown", "blue", "grey"]);
    

    d3.select(id).select("svg").remove()
    d3.select(".donut-tip").remove()

    var svg = d3.select(id)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');
    
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })
        .sort(null);
    
    var legendRectSize = 13;
    var legendSpacing = 6;
    
    var donutTip = d3.select(id).append("div")
        .attr("class", "donut-tip")
        .style("opacity", 0);
        donutTip.html("Placeholder")
    
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.title);
        })
        .attr('opacity', '.6')
        .attr('transform', 'translate(0, 0)')
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            donutTip.transition()
                .duration(300)
                .style("opacity", 1);
            let num = (Math.round((parseFloat(d.value) / parseFloat(d.data.all)) * 100 * 10)/10).toString() + '%';
            let value = d.value.toString() + " gram " + '(' + num + ")";
            donutTip.html(value)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 105) + "px");
    
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration(200)
                .attr('opacity', '.6');
            donutTip.transition()
                .duration('50')
                .style("opacity", 0);
        });
    
    
    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'square-legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize - 15;
            var vert = i * height - offset + 8;
            return 'translate(' + horz + ',' + vert + ')';
        });
    
    legend.append('rect')
        .style('fill', color)
        .style('stroke', color)
        .attr('x', "-4px")
        .attr('y', "-6px")
        .attr('width', '15px')
        .attr('height', '15px');
    
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d;
        })
        .style("font-size", "14px")
    }

    


    render() {
        return (
            <div className="detailDonutChart mx-0 px-0 col-12 mb-1"></div>
        )
    }
}
