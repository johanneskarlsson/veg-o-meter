import React, { Component } from "react";
import bg_video from "../videos/bg_video.mp4";
import Fade from "react-reveal/Fade";

export default class Home extends Component {
	render() {
		return (
			<div className="home">
				<Fade duration={1500} delay={200}>
				<div className="vh-100 w-100 d-flex justify-content-center align-items-center video-bg image-bg">
					{/*<video className="p-0 m-0" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src={bg_video} type="video/mp4" /></video>*/}
					<div className="container pb-5">
						<div className="row">
							<div className="col-md-12 pb-5 mx-auto">
								<h1 className="title">Välkommen till<br/>Grönsakshjälpen!</h1>
							</div>
						</div>
					</div>
				</div>
				</Fade>
			</div>
		);
	}
}
