import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "./modal";
//import { Link } from "react-router-dom";

class Products extends Component {
	updateModal = event => {
		var productId = event.target.name;
		console.log("this is a " + productId);
		this.props.get_details(productId);
	};

	render() {
		return (
			<div className="products">
				<div className="container-fluid pt-4">
					<div className="row">
						<div className="col-12">
							<div className="products">
								<div className="row justify-content-center ">
									<h2>Produkter</h2>
								</div>
								<div className="row pt-4">
									{this.props.vegetables.map(vegetable => {
										return (
											<div
												key={vegetable.id}
												className="hover d-flex flex-fill col-md-3 col-sm-4 col-6 border border-light p-0 m-0"
											>
												<img
													src={require("../images/" + vegetable.image)}
													alt={vegetable.name}
													className="img-fluid p-0"
												/>

												<span className="hover--on">
													<img
														src={require("../images/" + vegetable.image)}
														alt={vegetable.name}
														className="blur img-fluid p-0"
														name={vegetable.id}
														onClick={this.updateModal}
														data-toggle="modal"
														data-target=".bd-example-modal-lg"
													/>
													<h3 className="vegetable_name">
														{vegetable.name_swe}
													</h3>
												</span>
											</div>
										);
									})}
								</div>
							</div>
							<Modal
								detail={this.props.detail}
								vegetables={this.props.vegetables}
							/>
						</div>
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
		detail: state.vegetables.detail
	};
};

const mapDispatchToProps = dispatch => ({
	get_details: id => dispatch({ type: "GET_DETAILS", payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
