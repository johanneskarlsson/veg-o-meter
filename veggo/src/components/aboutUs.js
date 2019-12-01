import React, { Component } from "react";
import lucas from "../images/lucas.jpg";
import johannes from "../images/johannes.jpg";

export default class AboutUs extends Component {
	render() {
		return (
			<div className="container p-4">
				<h2>Om oss</h2>
				<div className="row mx-auto justify-content-center">
					<div className="col-md-3 col-10 p-2 mb-3">
						<div className="col-12">
							<img
								className="rounded mx-auto d-block img-fluid"
								src={lucas}
								alt="Lucas"
							/>
						</div>
						<div className="col-12">
							<p className="font-weight-bold m-0 mt-2">Lucas Ahlgren</p>
							<p className="m-0">Frontend/data</p>
							<a href="mailto:lucasah@kth.se">lucasah@kth.se</a>
						</div>
					</div>
					<div className="col-md-3 col-10 p-2 mb-3">
						<div className="col-12">
							<img
								className="rounded mx-auto d-block img-fluid"
								src={johannes}
								alt="Johannes"
							/>
						</div>
						<div className="col-12">
							<p className="font-weight-bold m-0 mt-2">Johannes Karlsson</p>
							<p className="m-0">Frontend/visualisering</p>
							<a href="mailto:jkar5@kth.se">jkar5@kth.se</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
