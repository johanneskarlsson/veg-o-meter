import { connect } from "react-redux";

import React, { Component } from "react";

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
	ifChecked = (vegetable) => {
		var checkedVegetable = this.props.compare.filter(compareVegetable => {return compareVegetable.id === vegetable.id });
		if(checkedVegetable.length > 0){
			console.log(checkedVegetable[0])
			return true
		}
		else{
			return false
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className="list-vegetables">
				<h2>List of vegetables</h2>
				<table className="mx-auto">
					<thead>
						<tr>
							<th></th>
							<th>Vegetable</th>
							<th>Compare</th>
						</tr>
					</thead>
					<tbody>
						{this.props.search.map(vegetable => {
						
							return (
								<tr key={vegetable.id}>
								<td><img src={require('./images/'+vegetable.image)} alt={vegetable.name} className="col-8" /></td>
									<td>{vegetable.name}</td>
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
	add_compare: vegetable =>
		dispatch({ type: "ADD_COMPARE", payload: vegetable }),
	remove_compare: vegetable =>
		dispatch({ type: "REMOVE_COMPARE", payload: vegetable })
});

export default connect(mapStateToProps, mapDispatchToProps)(ListVegetables);
