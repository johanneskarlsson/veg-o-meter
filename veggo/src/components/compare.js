import React, { Component } from "react";

import CompareVisualizations from "./compareVisualizations";
import DropdownSelect from "./dropdownSelect";
import DropdownFilter from "./dropdownFilter";

export default class Compare extends Component {
	render() {
		return (
			<div className="compare">
				<div className="compare-bg">
					<div className="container py-4 min-vh-100 w-100 compare-bg">
					<div className="row">
							<div className="col-md-4">
								<h2>Jämför grönsaker</h2>
							</div>
							<div className="col-md-5 pt-4 pt-md-0">
								<DropdownSelect />
							</div>
							<div className="col-md-3 pt-md-0 pt-2">
								<DropdownFilter />
							</div>
					</div>
				
					<CompareVisualizations />
					</div>
				</div>
			</div>
		);
	}
}
