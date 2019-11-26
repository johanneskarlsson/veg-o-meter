import React from "react";
import "./App.css";
import SearchBar from "./searchBar";
import ListVegetables from "./listVegetables";
import CompareVegetables from "./compareVegetables";

function App() {
	return (
		<div className="App">
			<h1>Veggo app</h1>
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
					<div className="col-md-4 pt-4">
						<CompareVegetables />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
