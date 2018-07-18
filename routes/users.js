const request = require("request"),
    rp = require("request-promise");


const index = (req, res) => {
    rp({ uri: `http://jsonplaceholder.typicode.com/users/`, json: true })
        .then((users) => {
            res.render('users/index', { users })
        })
        .catch((err) => {
            console.log(err)
        })
};

const detail = (req, res) => {
    let id = parseInt(req.params.id);
    
    rp({ uri: `http://jsonplaceholder.typicode.com/users/${id}`, json: true })
        .then((user) => {
            rp({ uri: `http://jsonplaceholder.typicode.com/users/${id}/posts`, json: true })
                .then((posts) => {
                    res.render('users/detail', { user: user, userPosts: posts });
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
};


module.exports = {
    index,
    detail
};