import React, { Component } from 'react';
import './App.css';
import Gallery from './Gallery';
import { Link } from "react-router-dom";
import queryString from 'query-string';


class Details extends Component {

  //   someFunction(){
  //     let params = queryString.parse(this.props.location.search)
  // }
  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
      values: []
    };
  }
  componentDidMount() {

    console.log("Will mount")
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
        //console.log("state: ", this.state.plugins);
      })
  }
  render() {
    console.log(this.props.location.search);
    const values = queryString.parse(this.props.location.search);
    console.log(values.id);
    return (
      //<div style={{ background : "https://www.moddevices.com/hubfs/assets/billboards/home-billboard.jpg" }}>
      <div class="back">
        <div class="body" style={{ padding: 24, minHeight: 800 }}>
          <h1> Details </h1>
          {this.state.plugins.map((plugin, index) => {
          console.log("state: ", plugin.id);
          console.log("true: ", values.id);

            if (plugin.id === values.id) {
              return (
                <a key={index} className="details">
                  <p className="name">{plugin.name}</p>
                  <p><img alt="No Image" className="img-fluid" src={plugin.screenshot_href} /></p>
                  <p>{plugin.brand+" / "+plugin.version}</p>
                  <p> Categorie : {plugin.category} </p>
                  <p> Author : {plugin.author.name} </p>
                  <p> {plugin.comment} </p>
                  <Link to={"/"} >
                    <p><button type="button" className="btn btn-outline-primary">Retour</button></p>
                  </Link>
                </a>
              );
            }
          })
          }
          </div>
          </div>
          );
        
      }
    }
    
    
    
    export default Details;
