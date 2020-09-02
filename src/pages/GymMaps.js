/**
 * @author Sai Pavan Akuralapu <sp536952@dal.ca>
 */

import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "../custom_css/GymLocator.css";
import GeoInfoWindow from './GeoInfoWindow';

const mapStyles = {
  width: "55%",
  height: "100%",
  position: "fixed",
};

class GymLocator extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    locations: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: [],
    selectedLink: []

  }
  componentDidMount() {
  //   axios.get(`${url}/api/gym/gymLocations`).then(response => {
  //     const locationresponse = response.data
  //     this.setState({ locations: locationresponse })
  //   }).catch(error => {
  //     this.setState({ error: true })
  //   })
   }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      selectedLink: props.link,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  showDetails = place => {
    // console.log(place);
  };


  render() {
    // let locationmaps = this.state.locations.map(location => {
    //   return (
    //     <div>
    //       <div class="card" style={{ width: "45%", left: "53%" }}>
    //         <div
    //           class="card-title text-center"
    //           style={{ "padding-top": "22px", "font-weight": "bold" }}
    //         >
    //           {location.name}
    //         </div>

    //         <div class="card-body1">
    //           <p class="card-text" style={{ textAlign: "center" }}>
    //             {location.address.street}
    //             <br />
    //             {location.address.city} , {location.address.province}
    //             <br />
    //             {location.address.postalcode}
    //           </p>
    //         </div>
    //         <div class="text-center">
    //           <a
    //             href={location.link}
    //             className="btn btn-outline-primary"
    //             style={{ width: "40%" }}
    //           >
    //             View club
    //             </a>
    //         </div>
    //       </div>
    //       <br />
    //     </div>
    //   )
    // })
    return (
      <div>
        {/* <Header /> */}

        <div style={{ width: "100vw", height: "100vh" }}>
          <Map
            google={this.props.google}
            zoom={15}
            // style={mapStyles}
            initialCenter={{ lat: 44.643465, lng: -63.582439 }}>
            {this.props.nearByGyms ? this.props.nearByGyms.map((loc, index) => (
              <Marker
                key={index}
                place_={loc.name}
                link={loc.vicinity}
                position={{ lat: loc.geometry.location.lat, lng: loc.geometry.location.lng }}
                onClick={this.onMarkerClick} />

            )):null}

            <GeoInfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h5>{this.state.selectedPlace}</h5>
                <p> {this.state.selectedLink}</p>
                  
              </div>
            </GeoInfoWindow>

            


          </Map>

        </div>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCeaF_zLUVnnSV6c-veuE1My-ZRWVYeLQQ",
})(GymLocator);