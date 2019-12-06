import React, { Component } from "react";

import CompareVisualizations from "./compareVisualizations";
import DropdownSelect from "./dropdownSelect";
import DropdownSort from "./dropdownSort";

export default class Compare extends Component {
	render() {
		return (
			<div className="compare-bg">
				<div className="container pt-4 vh-100 w-100 compare-bg">
					<div className="row">
						<div className="col-md-4">
							<div className="col-12">
								<h2>Jämför grönsaker</h2>
							</div>
							<div className="col-12 pt-3">
								<DropdownSelect />
								<DropdownSort />
							</div>
						</div>
						<div className="col-md-8 p-0">
							<div className="col-12 pt-md-0 pt-4 p-0">
								<CompareVisualizations />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
