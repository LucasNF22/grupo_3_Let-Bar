const express = require ("express");
const path = require("path");
const app = express();
const methodOverride =  require('method-override');

app.use(express.urlencoded ({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine","ejs");

let routesMain=require("./src/routes/main.js");



const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen(3000, () =>{
    console.log("Servidor listo en el puerto 3000...");
});



app.use ("/", routesMain);