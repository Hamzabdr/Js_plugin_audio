import React, { Component } from 'react';
import './App.css';
import Gallery from './Gallery';
import queryString from 'query-string';


class Details extends Component {

  someFunction(){
    let params = queryString.parse(this.props.location.search)
}
  render() {
    //let plugins = null;
    return (
      //<div style={{ background : "https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg" }}>
      <div class="back">
        <div class="body" style={{ background: 'https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg', padding: 24, minHeight: 800 }}>

          <h1> Details </h1>
        
        </div>
      </div>
    )
  }




}



export default Details;
