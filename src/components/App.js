import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        const fishes = { ...this.state.fishes }; // use spread operator to make a clone of existing state instead of mutating array
        fishes[`fish${Date.now()}`] = fish; //uses date.now to create a new property on the this.state.fishes that will be a new fish object
        this.setState({
            fishes: fishes
        })
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Shaundai is super cool" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
            )
    }
}

export default App;