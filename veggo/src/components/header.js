import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
	render() {
		return (
			<header className="header">
				<div className="row vh-20 p-0 m-0 header-bg">
					<div className="d-flex justify-content-center align-items-center vw-100">
						<div className="container">
							<div className="row justify-content-center">
								<h1>Grönsakshjälpen</h1>
							</div>

							<div className="row justify-content-center">
								<nav>
									<ul className="nav-links">
										<li>
											<Link to="/">Hem</Link>
										</li>
										<li>
											<Link to="/produkter">Produkter</Link>
										</li>
										<li>
											<Link to="/jämför">Jämför</Link>
										</li>
										<li>
											<Link to="/omoss">Om oss</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
