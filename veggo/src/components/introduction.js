import React, { Component } from "react";
import Fade from 'react-reveal/Fade';

export default class Introduction extends Component {
	render() {
		return (
			<div className="introduction">
				<div className="vh-100 w-100 d-flex justify-content-center align-items-center introduction-bg">
					<div className="container">
						<div className="row">
							<div className="col-md-12 pb-4 mx-auto">
                                <Fade left duration={1500} delay={150}>
								    <h1>Vad är Grönsakshjälpen?</h1>
                                </Fade>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8 col-10 mx-auto">
                            <Fade left duration={1500} delay={1150} >
								<h5 className="text-left introduction-subtitle">
									Grönsakshjälpen är ett verktyg för att hjälpa dig ta mer
									hållbara beslut kring köp av grönsaker. Du kan ta reda på
									olika grönsakers klimatavtryck i form av växthusgasutsläpp,
									vattenfotavtryck osv. Dessutom kan du jämföra olika grönsaker
									mot varandra för att på så sätt kunna välja de mest
									klimatvänliga grönsakerna för dig.
								</h5>
                                </Fade>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
