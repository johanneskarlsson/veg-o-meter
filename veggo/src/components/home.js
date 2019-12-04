import React, { Component } from "react";
//import bg_video from "../videos/bg_video.mp4"

export default class Home extends Component {
	render() {
		return (
            <div className="home">
            <div className="vh-80 d-flex justify-content-center align-items-center">
				{/*<video className="bg-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src={bg_video} type="video/mp4" /></video>*/}
			<div className="container pb-5">
				<div className="row">
					<div className="col-md-8 p-3 mx-auto">
						<h1>Välkommen till Grönsakshjälpen!</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 mx-auto">
						<h6>
							Grönsakshjälpen är ett verktyg för att hjälpa dig ta mer hållbara
							beslut kring köp av grönsaker. Du kan få information om såväl
							utsläpp av växthusgaser, vattenförbrukning till rekommendationer
							om grönsaker i säsong.
						</h6>
					</div>
				</div>
			</div>
            </div>
            </div>
		);
	}
}
