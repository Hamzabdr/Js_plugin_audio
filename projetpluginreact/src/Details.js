import React, { Component } from 'react';
import './App.css';


class Details extends Component {


  componentDidMount() {
    console.log("Will mount")
    this.getDataFromServer();
  }
  getDataFromServer() {
    fetch('http://localhost:8080/api/plugins')
      .then(response => {
        return response.json() // transforme le json texte en objet js
      })
      .then(res => { // data c'est le texte json de response ci-dessus
        res.data.forEach((el) => {
         
            let plugin = {
              name: el.name,
              screenshot_href: el.screenshot_href
            }
            this.plugins.push(plugin);
          
        });
        this.setState({ plugins: res.data });
        console.log("state: ", this.state.plugins);
      })
  }


  render() {
    //let plugins = null;
    return (
      //<div style={{ background : "https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg" }}>
      <div class="back">
        <div class="body" style={{ background: '#696969', padding: 24, minHeight: 280 }}>

          <h1> Details </h1>
          {this.state.plugins.map((plugin, index) => {
            return (
              <div key={index}>
                <div id= "wrapper" class="wrapper">
                  <p class="name"> <bold>{plugin.name}</bold></p>
                  <p><img alt="Not found" src={plugin.screenshot_href} /></p>
                  <p> Categorie : {plugin.category} </p>
                  <p>{plugin.brand}</p>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }




}



export default Details;
