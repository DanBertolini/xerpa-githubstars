const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/api/user/login', (req, res) => {
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;
  var options = {
    url: `https://api.github.com/authorizations`,
    headers: {
      'User-Agent': userName,
      'Authorization': 'Basic ' + Buffer.from(`${userName}:${userPassword}`).toString('base64')
    },
    method: 'POST',
    body: JSON.stringify({"scopes": ["public_repo"], "note": `admin script ${new Date().getTime()}`})
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end(error);
    }

    res.send(body);
  });
});

router.post('/api/user', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let userName = req.params.user;
  let options = {
    url: `https://api.github.com/user`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/repo/stared', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let options = {
    url: `https://api.github.com/users/${currentUserName}/starred`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/users/:user', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let userName = req.params.user;
  let options = {
    url: `https://api.github.com/legacy/user/search/${userName}`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/user/:user', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let userName = req.params.user;
  var options = {
    url: `https://api.github.com/users/${userName}`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/repo/stared/:user', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let userName = req.params.user;
  var options = {
    url: `https://api.github.com/users/${userName}/starred`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/repo/star/:owner/:repo', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let ownerName = req.params.owner;
  let repoName = req.params.repo;
  var options = {
    url: `https://api.github.com/user/starred/${ownerName}/${repoName}`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    },
    method: "PUT"
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

router.post('/api/repo/unstar/:owner/:repo', (req, res) => {
  let currentUserName = req.body.userName;
  let currentUserToken = req.body.userToken;
  let ownerName = req.params.owner;
  let repoName = req.params.repo;
  var options = {
    url: `https://api.github.com/user/starred/${ownerName}/${repoName}`,
    headers: {
      'User-Agent': currentUserName,
      'Authorization': 'Bearer ' + currentUserToken
    },
    method: "DELETE"
  };
  request(options, (error, response, body) => {
    if (error) {
      res.end();
    }
    res.send(body);
  });
});

app.use(router);

app.listen(process.env.port || 3000);
console.log('Listening on port: ' + (process.env.port || 3000));