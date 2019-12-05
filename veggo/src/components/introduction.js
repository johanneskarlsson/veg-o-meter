import React, { Component } from "react";

export default class Introduction extends Component {
	render() {
		return (
			<div className="introduction">
				<div className="vh-100 w-100 d-flex justify-content-center align-items-center">
					<div className="container pb-5">
						<div className="row">
							<div className="col-md-12 pb-5 mx-auto">
								<h2>Vad är Grönsakshjälpen?</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 mx-auto">
								<p>
									Grönsakshjälpen är ett verktyg för att hjälpa dig ta mer
									hållbara beslut kring köp av grönsaker. Du kan ta reda på
									olika grönsakers klimatavtryck i form av växthusgasutsläpp,
									vattenfotavtryck osv. Dessutom kan du jämföra olika grönsaker
									mot varandra för att på så sätt kunna välja de mest
									klimatvänliga grönsakerna.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
