 const path= require("path");
const mainController = {
    homeLogueado:(req, res) => {
        res.render(path.join(__dirname,"../views/Home-logueado"));
    },
    home:(req, res) => {
        res.render(path.join(__dirname,"../views/Home-sin-loguear"));

    },
};
 
module.exports = mainController;