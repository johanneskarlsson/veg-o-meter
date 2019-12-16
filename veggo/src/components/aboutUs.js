import React, { Component } from "react";
import lucas from "../images/lucas.jpg";
import johannes from "../images/johannes.jpg";

export default class AboutUs extends Component {
	render() {
		return (
			<div className="about-us">
				<div className="container pt-4">
					<h2>Om oss</h2>
					<div className="row mx-auto justify-content-center">
						<div className="col-lg-3 col-md-4 col-10 p-2 mb-3">
							<div className="col-10 mx-auto">
								<img
									className="rounded mx-auto d-block img-fluid"
									src={lucas}
									alt="Lucas"
								/>
							</div>
							<div className="col-12">
								<p className="font-weight-bold m-0 mt-2">Lucas Ahlgren</p>
								<p className="m-0">Frontend/data/visualisering</p>
								<a href="mailto:lucasah@kth.se">lucasah@kth.se</a>
							</div>
						</div>
						<div className="col-lg-3 col-md-4 col-10 p-2 mb-3">
							<div className="col-10 mx-auto">
								<img
									className="rounded mx-auto d-block img-fluid"
									src={johannes}
									alt="Johannes"
								/>
							</div>
							<div className="col-12">
								<p className="font-weight-bold m-0 mt-2">Johannes Karlsson</p>
								<p className="m-0">Frontend/design</p>
								<a href="mailto:jkar5@kth.se">jkar5@kth.se</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
