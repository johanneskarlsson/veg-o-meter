import React, { Component } from "react";
import { connect } from "react-redux";

class ListCompare extends Component {
	render() {
		return (
			<div className="compare-vegetables">
				<h2>Jämför grönsaker</h2>
				<table className="mx-auto">
					<thead>
						<tr>
							<th></th>
							<th>Namn</th>
						</tr>
					</thead>

					<tbody>
						{this.props.compare.map(vegetable => {
							return (
								<tr key={vegetable.name_swe}>
									<td>
										<img
											src={require("../images/" + vegetable.image)}
											alt={vegetable.name}
											className="col-md-6 col-10 p-0"
										/>
									</td>
									<td>{vegetable.name_swe}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		compare: state.vegetables.compare
	};
};

export default connect(mapStateToProps, null)(ListCompare);
