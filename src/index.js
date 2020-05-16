import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// Component is a function or a class
// Class components handles feedback from the user (use for complex topics)

// Timeline: JS file loaded by browser => app component instance gets created 
// => call geolocation service => app returns JSX & renders HTML => get result of geolocation
// with functional components, it will load without having geolocation cause geolocation is slow
// class component + state will allow for the page to load with the geolocation

// FUNCTIONAL:
// const App = () => {
//     return <div>Latitude:</div>
// }

// App Challenges: get users location, determine month, change text & styling 
// based on location & month

// RULES OF CLASS COMPONENTS
// Must be a Javscript Class, extend(subclass) React.Component, render method

// RULES OF STATE
// Only usable with class components, is a JS object that contains data relevant to 
// a component, updating state causes the component to rerender, state must be initialized
// when a component is created, ***can only be updated using function 'setState'***

class App extends React.Component {
    // specific to JS not React, it's run first, optional
    // constructor(props) { // one time setup
    //     super(props); //setup code for React.Component
    //     // this is the only time we use direct assignment
    //     this.state = { lat: null, errorMessage: '' };//state object initialization
    // }

    // alternative initialization, equivalent to constructor ^
    state = { lat: null, errorMessage: '' }

    // COMPONENT LIFECYCLE
    //  Constructor => render => componentDidMount (content visible)
    // =>componentDidUpdate (content updates) => componentWillUnmount (content disappears)
    componentDidMount() { // data loading
        console.log('My component was rendered')
        // geolocation gets coordinates
        window.navigator.geolocation.getCurrentPosition(
            // success & failure callback
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        )
    }
    componentDidUpdate() { //more data loading when state/props change
        console.log('My component was rerendered')
    }
    componentWillUnmount() { //cleanup (good for non-react stuff)
        console.log('My component was removed')
    }
    // helper method
    renderContent() {
        // conditional rendering
        if (this.state.errorMessage && !this.state.lat) {
            return (<div>Error: {this.state.errorMessage}</div>
            )
        }
        if (!this.state.errorMessage && this.state.lat) {
            return (<div><SeasonDisplay lat={this.state.lat} /></div>
            )
        }
        return <Spinner message="Accept Location Request" />

    }
    // Class Component must define render() & called constantly
    render() { // avoid doing anything but returning JSX
        // try to keep only 1 return method & use helper methods
        return(
        <div className="border white">
            {this.renderContent()}
        </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)