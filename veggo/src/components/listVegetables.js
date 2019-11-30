import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ListVegetables extends Component {
	// Add or remove vegetable from compare-list
	handleCheck = event => {
		const id = event.target.name;
		const checked = event.target.checked;
		console.log(id);
		console.log(checked);
		if (checked) {
			this.props.add_compare(id);
		} else {
			this.props.remove_compare(id);
		}
	};

	// Check if the vegetable is in the compare-list
	ifChecked = vegetable => {
		var checkedVegetable = this.props.compare.filter(compareVegetable => {
			return compareVegetable.id === vegetable.id;
		});
		if (checkedVegetable.length > 0) {
			console.log(checkedVegetable[0]);
			return true;
		} else {
			return false;
		}
	};

	render() {
		console.log(this.props);
		return (
			<div className="list-vegetables">
				<h2>Grönsakslista</h2>
				<table className="mx-auto">
					<thead>
						<tr>
							<th></th>
							<th>Namn</th>
							<th>Jämför</th>
						</tr>
					</thead>
					<tbody>
						{this.props.search.map(vegetable => {
							return (
								<tr key={vegetable.id}>
									<td>
										<Link to={`produkt/${vegetable.id}/${vegetable.name_swe.toLowerCase()}`}>
											<img
												name={vegetable.id}
												src={require("../images/" + vegetable.image)}
												alt={vegetable.name}
												className="col-md-6 col-10 p-0"
											/>
										</Link>
									</td>
									<td>{vegetable.name_swe}</td>
									<td>
										<input
											name={vegetable.id}
											type="checkbox"
											onChange={this.handleCheck}
											defaultChecked={this.ifChecked(vegetable)}
										/>
									</td>
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
	console.log(state.vegetables.search);
	console.log(state.vegetables.compare);
	return {
		vegetables: state.vegetables.vegetables,
		search: state.vegetables.search,
		compare: state.vegetables.compare
	};
};

const mapDispatchToProps = dispatch => ({
	add_compare: id => dispatch({ type: "ADD_COMPARE", payload: id }),
	remove_compare: id => dispatch({ type: "REMOVE_COMPARE", payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListVegetables);
