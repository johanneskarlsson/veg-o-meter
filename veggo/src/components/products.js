import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "./modal";
//import { Link } from "react-router-dom";

class Products extends Component {


    updateModal = event => {
        var productId = event.target.name;
        console.log(productId)
        this.props.get_details(productId);
    }

	render() {
		return (
			<div className="container p-4">
				<div className="row">
					<div className="col-12">
						<div className="products">
							<h2>Produkter</h2>
							<div className="row pt-4">
								{this.props.vegetables.map(vegetable => {
									return (
										<div key={vegetable.id} className="col-md-2 col-sm-4 col-6" >
											
												<img
                                                    onClick={this.updateModal}
                                                    data-toggle="modal" data-target=".bd-example-modal-lg"
                                                    name={vegetable.id}
													src={require("../images/" + vegetable.image)}
													alt={vegetable.name}
													className="img-fluid p-0"
												/>
											

											<p>{vegetable.name_swe}</p>
										</div>
									);
								})}
							</div>
						</div>
                        <Modal detail={this.props.detail} radarChart={this.props.radarChart} vegetables={this.props.vegetables} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.vegetables.search);
    console.log(state.vegetables.detail);
	return {
		vegetables: state.vegetables.vegetables,
        search: state.vegetables.search,
        detail: state.vegetables.detail,
        radarChart: state.vegetables.radarChart
	};
};

const mapDispatchToProps = dispatch => ({
	get_details: id => dispatch({ type: "GET_DETAILS", payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
