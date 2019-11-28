import { connect } from "react-redux";

import React, { Component } from "react";



class DetailVegetables extends Component {

	render() {
	
		if(this.props.detail !== null){
			const { name_swe } = this.props.detail;
		return (
			<div className="compare-vegetables">
				<h2>Produktdetaljer</h2>
				<div className="mx-auto">
					<h5>{name_swe}</h5>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div>
									<img src={require('./images/'+this.props.detail.image)} alt={this.props.detail.name} className="col-8" />
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
				</div>
					
			</div>
		);
		}
		else{
			return null
		}
	}
		}

		
const mapStateToProps = state => {
	console.log(state);
	return {
		detail: state.vegetables.detail
	
	};
};



export default connect(mapStateToProps,null)(DetailVegetables);





