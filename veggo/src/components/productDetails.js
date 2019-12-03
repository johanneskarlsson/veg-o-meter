import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as d3 from "d3";
import RadarChart from "./radarChart";

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = { dataLoading: true };
	}

	componentDidMount = () => {
		const { match } = this.props;
		const productId = match.params.productId;
		console.log(productId);
		window.scrollTo(0, 0);
		this.props.get_details(productId);
		this.setState({ dataLoading: false });
	};

	colorRanking = (ranking) => {

		var i = d3.scaleLinear()
                .domain([1, 11, 21])
                .range(['#1a9850', '#fee08b', '#d73027']) // Green, yellow, red
                .interpolate(d3.interpolateHcl);

		var color = i(ranking);

		return color;
	}

	render() {
		if (this.state.dataLoading === false) {
			console.log(this.props.detail);
			if (this.props.detail !== null) {
				const { name_swe } = this.props.detail;
				return (
					<div className="compare-vegetables">
						<div className="container p-4">
							<div className="row">
								<div className="col-12">
									<h2 className="text-center">Produktdetaljer</h2>
								</div>
							</div>
							<div className="row pt-4">
								
								<div className="col-md-5">
									<h3>{name_swe}</h3>
									<div className="col-12">
										<img
											src={require("../images/" + this.props.detail.image)}
											alt={this.props.detail.name}
											className="img-fluid"
										/>
									</div>
								
									</div>
									<div className="col-md-7 pt-md-0 pt-4">
								<div className="row">
										<div className="col-12 p-0">
											<RadarChart data={this.props.radarChart} />
										</div>
										</div>
										<div className="row">
											<p style={{backgroundColor: this.colorRanking(this.props.detail.water_footprint.ranking)}} className="col-lg-4 col-6">{`Vattenfotavtryck: ${this.props.detail.water_footprint.value} ${this.props.detail.water_footprint.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.emissions.ranking)}} className="col-lg-4 col-6">{`Växthusgasutsläpp: ${this.props.detail.emissions.value} ${this.props.detail.emissions.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.land_use.ranking)}} className="col-lg-4 col-6">{`Markanvändning: ${this.props.detail.land_use.value} ${this.props.detail.land_use.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.energy.ranking)}} className="col-lg-4 col-6">{`Energiförbrukning: ${this.props.detail.energy.value} ${this.props.detail.energy.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.freshwater_toxicity.ranking)}} className="col-lg-4 col-6">{`Sötvattenförgiftning: ${this.props.detail.freshwater_toxicity.value} ${this.props.detail.freshwater_toxicity.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.fossil_depletion.ranking)}} className="col-lg-4 col-6">{`Fossil utarmning: ${this.props.detail.fossil_depletion.value} ${this.props.detail.fossil_depletion.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.freshwater_eutrophication.ranking)}} className="col-lg-4 col-6">{`Sörvattenförsurning: ${this.props.detail.freshwater_eutrophication.value} ${this.props.detail.freshwater_eutrophication.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.marine_eutrophication.ranking)}} className="col-lg-4 col-6">{`Marinförsurning: ${this.props.detail.marine_eutrophication.value} ${this.props.detail.marine_eutrophication.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.terrestrial_acidification.ranking)}} className="col-lg-4 col-6">{`Markförsurning: ${this.props.detail.terrestrial_acidification.value} ${this.props.detail.terrestrial_acidification.unit}`}</p>
											<p style={{backgroundColor: this.colorRanking(this.props.detail.terrestrial_toxicity.ranking)}} className="col-lg-4 col-6">{`Markförgiftning: ${this.props.detail.terrestrial_toxicity.value} ${this.props.detail.terrestrial_toxicity.unit}`}</p>
										</div>	
										
								</div>
							
							</div>
						</div>
					</div>
				);
			} else {
				return <Redirect to="/" />;
			}
		} else return null;
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		detail: state.vegetables.detail,
		radarChart: state.vegetables.radarChart
	};
};

const mapDispatchToProps = dispatch => ({
	get_details: id => dispatch({ type: "GET_DETAILS", payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
