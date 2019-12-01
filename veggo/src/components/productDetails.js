import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = { dataLoading: true };
	}

	componentDidMount = () => {
		const { match } = this.props;
		const productId = match.params.productId;
		console.log(productId);
		this.props.get_details(productId);
		this.setState({ dataLoading: false });
	};

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
								<div className="col-6">
									<img
										src={require("../images/" + this.props.detail.image)}
										alt={this.props.detail.name}
										className="img-fluid"
									/>
								</div>
								<div className="col-6">
									<h3>{name_swe}</h3>
									<p>{`Vattenavtryck: ${this.props.detail.water_footprint.value} ${this.props.detail.water_footprint.unit}`}</p>
									<p>{`Utsläpp: ${this.props.detail.emissions.value} ${this.props.detail.emissions.unit}`}</p>
									<p>{`Markanvändning: ${this.props.detail.land_use.value} ${this.props.detail.land_use.unit}`}</p>
									<p>{`Energiförbrukning: ${this.props.detail.energy.value} ${this.props.detail.energy.unit}`}</p>
									<p>{`Sötvattentoxicitet: ${this.props.detail.freshwater_toxicity.value} ${this.props.detail.freshwater_toxicity.unit}`}</p>
									<p>{`Fossil utarmning: ${this.props.detail.fossil_depletion.value} ${this.props.detail.fossil_depletion.unit}`}</p>
									<p>{`Sötvatten eutrofiering: ${this.props.detail.freshwater_eutrophication.value} ${this.props.detail.freshwater_eutrophication.unit}`}</p>
									<p>{`Marin eutrofiering: ${this.props.detail.marine_eutrophication.value} ${this.props.detail.marine_eutrophication.unit}`}</p>
									<p>{`Markförsurning: ${this.props.detail.terrestrial_acidification.value} ${this.props.detail.terrestrial_acidification.unit}`}</p>
									<p>{`Markförgiftning: ${this.props.detail.terrestrial_toxicity.value} ${this.props.detail.terrestrial_toxicity.unit}`}</p>
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
		detail: state.vegetables.detail
	};
};

const mapDispatchToProps = dispatch => ({
	get_details: id => dispatch({ type: "GET_DETAILS", payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
