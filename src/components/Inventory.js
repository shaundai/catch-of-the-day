import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        addFish: PropTypes.func,
        deleteFish: PropTypes.func,
        updateFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    //rechecks whether you are the owner when you manually refresh the page
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({ user });
            }
        })
    }
    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, {context : this});
        console.log(store);
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    }

    logout = async () => {
        console.log('Logging out...')
        await firebase.auth().signOut();
        this.setState({ uid: null });
        }
    render(){
        //logout button - could also be its own separate component
        const logout = <button onClick={this.logout}>Log Out</button>
        //check if they are logged in
        if(!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }
        //check if they are the rightful owner
        if(this.state.uid !== this.state.owner){
            return(
                <div>
                    <p>Sorry, you aren't the owner!</p>
                    {logout}
                </div>
            )
        }
        //if they are the owner, render their inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes} >Load Sample Fishes</button>
            </div>
            )
    }
}

export default Inventory;