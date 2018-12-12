import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import Details from './Details';


class Gallery extends Component {


  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
    };
  }

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
          if (el.name.length > 40 && el.screenshot_href == "") {
            let plugin = {
              name: el.name,
              screenshot_href: el.screenshot_href
            }
            this.plugins.push(plugin);
          }
        });
        this.setState({ plugins: res.data });
        console.log("state: ", this.state.plugins);
      })
  }

  /*   goDetails() {
      return (
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            path="/Details"
            render={props => <Details {...props} extra={this.state.plugins[0].id} />}
          />
         
        </Switch>
      );
    }; */
  render() {
    //let plugins = null;
    return (
      //<div style={{ background : "https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg" }}>
      <div class="back">
        <div class="body" style={{ background: "#696969", padding: 24, minHeight: 800 }}>

          <h1> Plugins gallery</h1>
          {this.state.plugins.map((plugin, index) => {
                if (plugin.screenshot_href != null){
            return (
              <div key={index} class="wrapper">
                <p class="name"> <bold>{plugin.name}</bold></p>
                <p><img alt="No Image" src={plugin.screenshot_href} /></p>
                <p> Categorie : {plugin.category} </p>
                <p>{plugin.brand}</p>
                <Link to={"/Details?id="+plugin.id} render={(props) => <Details {...props} />}>
                <p><button type="button" class="btn btn-outline-primary">Details</button></p>
                </Link>
                
              </div>
            );
                }
          })
        
          }
        </div>
      </div>
    )
  }




}



export default Gallery;
