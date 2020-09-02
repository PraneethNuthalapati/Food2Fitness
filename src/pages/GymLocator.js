/**
 * @author Sai Pavan Akuralapu <sp536952@dal.ca>
 * @author Praneeth Nuthalapati <pr455456@dal.ca>
 */

import React, { Component } from 'react';
// import './GymLocator.css';
import { GoogleComponent } from 'react-google-location' ;
import Axios from 'axios';
import GymMap from './GymMaps';
import Header from '../components/Header';
import Footer from "./Footer_black";
const API_KEY = "AIzaSyCeaF_zLUVnnSV6c-veuE1My-ZRWVYeLQQ"

class GymLocator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
      nearBy: null,
      lat: 44.64476, 
      lng: -63.599324
    };
  }

  selectHandler = (e) =>{
    this.setState({ place: e })
    const place={...this.state.place};
    const placeCoordinates= {...place.coordinates};
    Axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${placeCoordinates.lat},${placeCoordinates.lng}&radius=1000&type=Gym&keyword=Gym&distance&key=AIzaSyCeaF_zLUVnnSV6c-veuE1My-ZRWVYeLQQ`)
    .then(res =>{
      // console.log(result);
      const a= {...res.data}
      // const b=[...a.results];
      // console.log(a.results);
      this.setState({nearBy: a.results})
    })
    .catch(err => {
      // console.log(err);
    })
    //  console.log(place.coordinates);
    // console.log(placeCoordinates.lat);
}
    
  
  render() {
   
      // console.warn("test", this.state.place)
    
 

    return (
      <div>
        <Header></Header>
        <div className="wrapper" style={{marginTop:'80px'}}>
        <GoogleComponent apiKey={API_KEY} language={'en'}  coordinates={true} onChange={this.selectHandler} />
        <GymMap nearByGyms={this.state.nearBy} currentlocation={this.state.place} />
      </div>
      <Footer></Footer>
      </div>
    );
  }
}




export default GymLocator;