


import React from "react";
import './App.css';
class App extends React.Component {

	// Constructor
	// when first creating class, give it some props
	// ensure this class has props
	// props - things you want to pass between components (parent --> child)

	constructor(props) {
		// it's inheriting props from thing it's extending
		super(props);

		//lives within the component - component can be dynamic
		this.state = {
			items: {},
			DataisLoaded: false
			// helps to render the component
		};
	}

	// ComponentDidMount - react specific component 
	// once it's rendered, it fetches data 
	componentDidMount() {
		// native ajax library 
		fetch(
"https://api.weather.gov/gridpoints/MPX/107,71/forecast/hourly")
			// promise fulfilled, then .then gets involved
			// what gets fetched from the intial call gets returned as res
			.then((res) => res.json()) // parsing the data which gives back json and giving us JS object
			.then((json) => { // then I can set state
				this.setState({ // setState is a react function
					items: json.properties.periods.slice(0,1), //causes to re-render
					DataisLoaded: true
				});

				
			})
	}
	render() {
		//item is a reference
		// Load everything into items
		const { DataisLoaded, items } = this.state; //de-constructing stuff from state

		//render in meantime until data is loaded
		if (!DataisLoaded) return <div>  
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">
			<h1> Weather Where I Am.</h1> {
				items.map((item) => ( // js method, for every item do this. Utilizes call back. Callback is item
					// this.state.items.map -- annoying!! so destructure on line 43 is needed
 
				<ol key = { item.number } >
					<div className="temp"> Temperature: { item.temperature }  { item.temperatureUnit }</div>
					<div className="temp"> Wind Speed: { item.windSpeed } </div>
					<div className="temp"> Wind Direction: { item.windDirection } </div>
					<div className="temp"> Wind Short Forecast: { item.shortForecast } </div>
					<img alt="icon" src={item.icon}></img> 
					</ol>
				)
				)
			}
		</div>
	);
}
}

export default App;