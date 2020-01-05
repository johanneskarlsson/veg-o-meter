import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import logo from "../images/grönsakshjälpen_logo2.png";
import arrow from "../images/arrow-down.png";
import {
	Link	
} from "react-scroll";

export default class Home extends Component {
	render() {
		return (
			<div className="home">
				<Fade duration={1000} delay={100}>
					<div className="vh-100 w-100 d-flex justify-content-center align-items-center video-bg image-bg">
						<div className="container pb-5">
							<div className="row pb-5">
								<div className="col-md-6 col-11 mx-auto">
									<Fade down duration={1200} delay={800}>
										<img
											className="img-fluid"
											src={logo}
											alt="Logo Grönsakshjälpen"
										/>
									</Fade>
								</div>
							</div>
						</div>

						<Fade duration={1000} delay={2000}>
							<div className="arrow-container animated fadeInDown">
								<Link
									activeClass="active"
									to="introduction"
									spy={true}
									smooth={true}
									duration={900}
									onSetActive={this.handleSetActive}
								>
									<div className="arrow-2">
										<img src={arrow} alt="Arrow" className="image mx-auto" />
									</div>
								</Link>
								<div className="arrow-1 animated zoomIn" />
							</div>
						</Fade>
					</div>
				</Fade>
			</div>
		);
	}
}
