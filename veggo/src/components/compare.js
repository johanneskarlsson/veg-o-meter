import React, { Component } from "react";
import SearchBar from "./searchBar";
import ListVegetables from "./listVegetables";
import ListCompare from "./listCompare";

export default class Compare extends Component {
	render() {
		return (
			<div className="container p-4">
				<div className="row">
					<div className="col-md-6">
						<div className="col-12">
							<SearchBar />
						</div>
						<div className="col-12 pt-4">
							<ListVegetables />
						</div>
					</div>
					<div className="col-md-6">
						<div className="col-12 pt-md-0 pt-4">
							<ListCompare />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
