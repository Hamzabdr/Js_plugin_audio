const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});
// Lance le serveur avec express
server.listen(port);

console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', function(req, res) {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

// On va récupérer des plugins par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de plugins par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les plugins 10 par 10
app.get('/api/plugins', function(req, res) { 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 100);

 	mongoDBModule.findplugins(page, pagesize, function(data) {
 		var objdData = {
 			msg:"plugin recherchés avec succès",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
}); 

// Récupération d'un seul plugin par son id
app.get('/api/plugins/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.findpluginById(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
 
});

// Creation d'un plugin par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/plugins', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un plugin en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipart

 	mongoDBModule.createplugin(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un plugin, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/plugins/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateplugin(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un plugin
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/plugins/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteplugin(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})

