import React from "react";
import "./App.css";
import SearchBar from "./searchBar";
import ListVegetables from "./listVegetables";
import CompareVegetables from "./compareVegetables";
import DetailVegetable from "./detailVegetable";

function App() {
	return (
		<div className="App">
			<div className="container-fluid min-vh-100">
				<div className="row vh-20 header-bg">
					<header className="d-flex justify-content-center align-items-center vw-100">
						<h1 className="text-center">Grönsakshjälpen</h1>
					</header>
				</div>
				<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="col-12 pt-4">
							<SearchBar />
						</div>
						<div className="col-12 pt-4">
							<ListVegetables />
						</div>
					</div>
					<div className="col-md-6 pt-4">
						<div className="col-12 pt-4">
							<CompareVegetables />
						</div>
						<div className="col-12 pt-4">
							<DetailVegetable />
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	);
}

export default App;
