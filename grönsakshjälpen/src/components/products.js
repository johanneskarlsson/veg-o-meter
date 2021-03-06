import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "./modal";
//import { Link } from "react-router-dom";

class Products extends Component {
	updateModal = event => {
		console.log(event);
		var productId = event.target.getAttribute("data-id");
		console.log("this is a " + productId);
		this.props.get_details(productId);
	};

	render() {
		return (
			<div className="products">
				<div className="container p-md-4 pt-4">
					<div className="row">
						<div className="col-12">
							<div className="products">
								<div className="row justify-content-center">
									<h2>Grönsaker</h2>
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

												<div
													className="hover--on"
													onClick={this.updateModal}
													data-toggle="modal"
													data-target=".productDetails-modal"
												>
													<img
														src={require("../images/" + vegetable.image)}
														alt={vegetable.name}
														className="blur img-fluid p-0"
														data-id={vegetable.id}
													/>
													<h3 className="vegetable_name" data-id={vegetable.id}>
														{vegetable.name_swe}
													</h3>
												</div>
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
