import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Products extends Component {
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
										<div key={vegetable.id} className="col-md-2 col-sm-4 col-6">
											<Link
												to={`produkt/${
													vegetable.id
												}/${vegetable.name_swe.toLowerCase()}`}
											>
												<img
													name={vegetable.id}
													src={require("../images/" + vegetable.image)}
													alt={vegetable.name}
													className="img-fluid p-0"
												/>
											</Link>

											<p>{vegetable.name_swe}</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.vegetables.search);
	console.log(state.vegetables.compare);
	return {
		vegetables: state.vegetables.vegetables,
		search: state.vegetables.search
	};
};

export default connect(mapStateToProps, null)(Products);
