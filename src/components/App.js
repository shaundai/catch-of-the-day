import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
componentDidMount(){
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
        this.setState({
            order: JSON.parse(localStorageRef)
        })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    })
}

componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
}

componentWillUnmount(){
    base.removeBinding(this.ref);
}

    addFish = fish => {
        const fishes = { ...this.state.fishes }; // use spread operator to make a clone of existing state instead of mutating array
        fishes[`fish${Date.now()}`] = fish; //uses date.now to create a new property on the this.state.fishes that will be a new fish object
        this.setState({
            fishes: fishes
        })
    }

    updateFish = (key, updatedFish) => {
        //take copy of the current state
        const fishes = { ...this.state.fishes };
        //update the state to that of the updatedFish we took in
        fishes[key] = updatedFish
        //set the state with the updatedFish'
        this.setState({
            fishes: fishes
        })
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({
            order: order
        })
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Shaundai is super cool" />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} />
            </div>
            )
    }
}

export default App;