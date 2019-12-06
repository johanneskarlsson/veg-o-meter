import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as d3 from "d3";
import DetailRadarChart from "./detailRadarChart";
import DetailDonutChart from "./detailDonutChart";

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
								<div className="col-md-6">
									<h3>{name_swe}</h3>
									<div className="row p-md-2">
										<div className="col-md-8 mx-auto">
											<img
												src={require("../images/" + this.props.detail.image)}
												alt={this.props.detail.name}
												className="img-fluid"
											/>
										</div>
										<div className="col-12">
											<h4>{`Pris: ${this.props.detail.price.value} ${this.props.detail.price.unit}`}</h4>
										</div>
									</div>
									<div className="row p-2">
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.water_footprint.ranking)}} className="m-0">{`Vattenfotavtryck: ${this.props.detail.water_footprint.value} ${this.props.detail.water_footprint.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.emissions.ranking)}} className="m-0">{`Växthusgasutsläpp: ${this.props.detail.emissions.value} ${this.props.detail.emissions.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.land_use.ranking)}} className="m-0">{`Markanvändning: ${this.props.detail.land_use.value} ${this.props.detail.land_use.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.energy.ranking)}} className="m-0">{`Energiförbrukning: ${this.props.detail.energy.value} ${this.props.detail.energy.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.freshwater_toxicity.ranking)}} className="m-0">{`Sötvattenförgiftning: ${this.props.detail.freshwater_toxicity.value} ${this.props.detail.freshwater_toxicity.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.fossil_depletion.ranking)}} className="m-0">{`Fossil utarmning: ${this.props.detail.fossil_depletion.value} ${this.props.detail.fossil_depletion.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.freshwater_eutrophication.ranking)}} className="m-0">{`Sötvattenförsurning: ${this.props.detail.freshwater_eutrophication.value} ${this.props.detail.freshwater_eutrophication.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.marine_eutrophication.ranking)}} className="m-0">{`Marinförsurning: ${this.props.detail.marine_eutrophication.value} ${this.props.detail.marine_eutrophication.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.terrestrial_acidification.ranking)}} className="m-0">{`Markförsurning: ${this.props.detail.terrestrial_acidification.value} ${this.props.detail.terrestrial_acidification.unit}`}</p></div>
									<div className="col-lg-4 col-6 p-1 pb-0"><p style={{backgroundColor: this.colorRanking(this.props.detail.terrestrial_toxicity.ranking)}} className="m-0">{`Markförgiftning: ${this.props.detail.terrestrial_toxicity.value} ${this.props.detail.terrestrial_toxicity.unit}`}</p></div>
										</div>									
									</div>
									<div className="col-md-6 pt-md-0 pt-4">
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
		vegetables: state.vegetables.vegetables,
		detail: state.vegetables.detail,
		radarChart: state.vegetables.radarChart
	};
};

const mapDispatchToProps = dispatch => ({
	get_details: id => dispatch({ type: "GET_DETAILS", payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
