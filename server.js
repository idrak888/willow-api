const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { User } = require('./db/User');
const { Post } = require('./db/Post');
const { Starter } = require('./db/Starter');

const app = express();
var port = process.env.PORT || 3100;

const pathToPublic = path.join(__dirname, './public');
app.use(express.static(pathToPublic));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get("/user", (req, res) => {
	User.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/user/:id", (req, res) => {
	var _id = req.params.id;
 
	User.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.get("/post/:limit", (req, res) => {
	var limit = req.params.limit;

	Post.find().limit(parseInt(limit)).then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get('/posts/:username', (req, res) => {
    var username = req.params.username;

    Post.find({by:username}).then(doc => {
        res.send(doc);
    }).catch(e => {
        res.send(e);
    });
})

app.post("/user", (req, res) => {
	var NewUser = new User({
        _id: req.body.uid,
		name: req.body.name,
        email: req.body.email,
        posts: []
	});

	NewUser.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.post('/post/like/:id', (req, res) => {
    var _id = req.params.id;

    Post.findOneAndUpdate({ _id }, { $push: { likes:req.body.username } }).then(doc => {
        res.send(doc);
    }).catch(e => {
        res.send(e);
    });
});

app.post("/post", (req, res) => {
	var NewPost = new Post({
        _id: req.body.uid,
        by: req.body.by,
        datePosted: req.body.datePosted,
        starter: req.body.starter,
        likes: []
	});

	NewPost.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send();
    });
});

app.get('/starters', (req, res) => {
    Starter.find().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.send(e);
    });
});

app.post('/starters', (req, res) => {
    var NewStarter = new Starter({
        text: req.body.text
	});

	NewStarter.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send();
    });
});

app.delete("/user/:id", (req, res) => {
	var _id = req.params.id;

	User.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/post/:id", (req, res) => {
	var _id = req.params.id;

	Post.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.delete("/starter", (req, res) => {
	Starter.find({text:req.body.text}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});