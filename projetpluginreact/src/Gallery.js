import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import Details from './Details';
import Pagination from "react-js-pagination";


class Gallery extends Component {


  constructor(props) {
    super(props);
    this.state = {
      activePage : 1,
      plugins: [],
    };
  }

  componentDidMount() {
    console.log("Will mount")
    this.getDataFromServer();
  }
  getDataFromServer() {
    fetch('http://localhost:8080/api/plugins?page=1')
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
      <div className="back">
        <div className="body" style={{ padding: 24, minHeight: 800 }}>

          <h1> Plugins gallery</h1>

          {this.state.plugins.map((plugin, index) => {
                if (plugin.screenshot_href != null){
                  return (
              <a key={index} className="wrapper">
                <p className="name">{plugin.name}</p>
                <p><img alt="No Image" className="img-fluid" src={plugin.screenshot_href} /></p>
                <p> Categorie : {plugin.category} </p>
                <p>{plugin.brand}</p>
                <Link to={"/details?id="+plugin.id} key={plugin.id} render={(props) => <Details {...props} />}>
                <p><button type="button" className="btn btn-outline-primary">Details</button></p>
                </Link>
                </a>

            );
                }
          })
        
          }
        </div>
        <p className="Page"><Pagination
                    prevPageText={<i className='glyphicon glyphicon-menu-left'/>}
                    nextPageText={<i className='glyphicon glyphicon-menu-right'/>}
                    activePage={this.state.activePage}
                    onChange={this.handlePageChange}
                  />
                  </p>
      </div>

    )
  }




}



export default Gallery;
