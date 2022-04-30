const indexCtrl = {};


indexCtrl.rederIndex = (req, res) => {
    res.render("index");
};
indexCtrl.rederAbout = (req, res) => {
    res.render("about");
};
module.exports = indexCtrl;
