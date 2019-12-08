import React, { Component } from "react";

import CompareVisualizations from "./compareVisualizations";
import DropdownSelect from "./dropdownSelect";
import DropdownFilter from "./dropdownFilter";

export default class Compare extends Component {
	render() {
		return (
			<div className="compare-bg">
				<div className="container pt-4 vh-100 w-100 compare-bg">
					<div className="row">
							<div className="col">
								<h2>Jämför grönsaker</h2>
							</div>
							<div className="col">
								<DropdownSelect />
							</div>
							<div className="col">
								<DropdownFilter />
							</div>
					</div>
					<CompareVisualizations />
				</div>
			</div>
		);
	}
}
