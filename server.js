const express = require('express')
    , path = require('path')
    , config = require('config')
    , postsController = require('./routes/posts')
    , usersController = require('./routes/users')
    , albumsController = require('./routes/albums')

    , app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + 'public'));


app.get('/', (req, res) => {
    res.redirect('/posts/');
})

app.get("/posts/", postsController.index);
app.get("/posts/:id", postsController.detail);

app.get('/users/:id', usersController.detail);
app.get('/users/', usersController.index);

app.get("/albums/", albumsController.index);
app.get("/albums/:albumId", albumsController.detail);



app.listen(config.get('port'), () => {
    console.log(`Running on port ${config.get('port')}`);
});