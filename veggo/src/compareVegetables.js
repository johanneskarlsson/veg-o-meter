import { connect } from "react-redux";

import React, { Component } from "react";



class CompareVegetables extends Component {

	render() {
		return (
			<div className="compare-vegetables">
				<h2>Compare list</h2>
				<table className="mx-auto">
					<thead>
					<tr>
						<th></th>
						<th>Vegetable</th>
					</tr>
					</thead>
		
					<tbody>
					{this.props.compare.map(vegetable => {
						return (
							<tr key={vegetable.name}>
								<td><img src={require('./images/'+vegetable.image)} alt={vegetable.name} className="col-8" /></td>
								<td>{vegetable.name}</td>
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



export default connect(mapStateToProps,null)(CompareVegetables);





