import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as d3 from "d3";
import DetailRadarChart from "./detailRadarChart";

class Modal extends Component {
    constructor(props) {
		super(props);
		this.state = { data: {
            "id": 1,
            "image": "asparagus.jpg",
            "name": "Asparagus",
            "name_swe": "Sparris",
            "price": {"value":  147.6, "unit": "kr/kg"},
            "energy": {"value": 64.7, "unit": "MJ/kg", "ranking":21},
            "fossil_depletion": {"value": 1.4, "unit": "kg oil eq./kg", "ranking":21},
            "water_volume": {"value": 746, "unit": "L/kg"},
            "water_footprint": {"value": 525, "unit": "Leq./kg", "ranking":21},
            "emissions": {"value": 5.3, "unit": "kg CO2 eq./kg", "ranking":21},
            "land_use": {"value": 4.1, "unit": "m2 a/kg", "ranking":21},
            "freshwater_toxicity": {"value": 99, "unit": "g 1,4-DB eq./kg", "ranking":15},
            "terrestrial_toxicity": {"value": 22.5, "unit": "g 1,4-DB eq./kg", "ranking":21},
            "freshwater_eutrophication": {"value": 0.6, "unit": "g P eq./kg", "ranking":20},
            "marine_eutrophication": {"value": 15.9, "unit": "g N eq./kg", "ranking":21},
            "terrestrial_acidification": {"value": 27.1, "unit": "g SO2 eq./kg", "ranking":21}
        }};
    }


	componentDidUpdate = (prevProps) => {
        if(this.props !== prevProps){
            this.setState({ data: this.props.detail });
        }
	
		
	};

	colorRanking = (ranking) => {
		var length = this.props.vegetables.length;
		var middlePoint = Math.round(length/2);

		var i = d3.scaleLinear()
                .domain([1, middlePoint, length])
                .range(['#1a9850', '#fee08b', '#d73027']) // Green, yellow, red
                .interpolate(d3.interpolateHcl);

		var color = i(ranking);

		return color;
	}

	render() {
        const {data} = this.state;
				return (
                    
<div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div className="compare-vegetables">
						<div className="container p-4">
							<div className="row">
								<div className="col-12">
									<h2 className="text-center">Produktdetaljer</h2>
								</div>
							</div>
							<div className="row pt-4">
								<div className="col-md-5">
									<h3>{data.name_swe}</h3>
									<div className="row p-md-2">
										<div className="col-md-12 mx-auto">
											<img
												src={require("../images/" + data.image)}
												alt={data.name}
												className="img-fluid"
											/>
										</div>
										<div className="col-12">
											<h4>{`Pris: ${data.price.value} ${data.price.unit}`}</h4>
										</div>
									</div>
									<div className="row p-2">
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.water_footprint.ranking)}} className="m-0">{`Vattenfotavtryck: ${data.water_footprint.value} ${data.water_footprint.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.emissions.ranking)}} className="m-0">{`Växthusgasutsläpp: ${data.emissions.value} ${data.emissions.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.land_use.ranking)}} className="m-0">{`Markanvändning: ${data.land_use.value} ${data.land_use.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.energy.ranking)}} className="m-0">{`Energiförbrukning: ${data.energy.value} ${data.energy.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.freshwater_toxicity.ranking)}} className="m-0">{`Sötvattenförgiftning: ${data.freshwater_toxicity.value} ${data.freshwater_toxicity.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.fossil_depletion.ranking)}} className="m-0">{`Fossil utarmning: ${data.fossil_depletion.value} ${data.fossil_depletion.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.freshwater_eutrophication.ranking)}} className="m-0">{`Sötvattenförsurning: ${data.freshwater_eutrophication.value} ${data.freshwater_eutrophication.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.marine_eutrophication.ranking)}} className="m-0">{`Marinförsurning: ${data.marine_eutrophication.value} ${data.marine_eutrophication.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.terrestrial_acidification.ranking)}} className="m-0">{`Markförsurning: ${data.terrestrial_acidification.value} ${data.terrestrial_acidification.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(data.terrestrial_toxicity.ranking)}} className="m-0">{`Markförgiftning: ${data.terrestrial_toxicity.value} ${data.terrestrial_toxicity.unit}`}</p></div>
										</div>									
									</div>
									<div className="col-md-7 pt-md-0 pt-4">
									<h3>Ranking</h3>
										<div className="row">
												<div className="col-12 p-0">
													<DetailRadarChart data={this.props.radarChart} vegetables={this.props.vegetables} />
												</div>
										</div>
									</div>
								</div>
							</div>
						</div>
    </div>
  </div>
</div>

                    
                    );
                  
                    
        
		}
	}



export default Modal;
