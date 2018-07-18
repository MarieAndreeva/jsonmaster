const request = require("request"),
    rp = require("request-promise");


const index = (req, res) => {
    rp({uri: "http://jsonplaceholder.typicode.com/posts/", json: true})
        .then((posts) => {
            rp({ uri: `http://jsonplaceholder.typicode.com/users/`, json: true })
                .then((users) => {
                    res.render('posts/index', { posts, users });
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });
};

const detail = (req, res) => {
    var id = parseInt(req.params.id);

    rp({uri: `http://jsonplaceholder.typicode.com/posts/${id}`, json: true})
        .then((post) => {
            rp({uri: `http://jsonplaceholder.typicode.com/posts/${id}/comments`, json: true})
                .then((comments) => {
                    rp({uri: `http://jsonplaceholder.typicode.com/users/${post.userId}/`, json: true})
                        .then((user) => {
                            res.render("posts/detail", {post: post, comments: comments, user: user});
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch(function (err) {
            console.log(err);
        });
};




module.exports = {
    index,
    detail
};