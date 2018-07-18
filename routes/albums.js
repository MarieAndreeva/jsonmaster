const request = require("request"),
    rp = require("request-promise");


const index = (req, res) => {
    rp({uri: "http://jsonplaceholder.typicode.com/albums/", json: true})
        .then((albums) => {
            res.render('albums/index', { title: "Blog app", albums });
        })
        .catch((err) => {
            console.log(err);
        });
};

const detail = (req, res) => {
    var id = parseInt(req.params.albumId);
    
    rp({uri: `http://jsonplaceholder.typicode.com/albums/${id}`, json: true})
    .then((album) => {
            rp({uri: `http://jsonplaceholder.typicode.com/albums/${album.id}/photos/`, json: true})
                
            .then((photos)=> {
                    console.log(photos)
                    res.render("albums/detail", {album: album, photos: photos});
                })
            .catch((err) => {
                 console.log(err);
             })
        })
        .catch((err) => {
            console.log(err);
        })
    .catch(function (err) {
        console.log(err);
    });
};


module.exports = {
    index,
    detail
};