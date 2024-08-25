const simpleGet = (req, res) => {
     res.send("Index Route, Get, Chat-me")
}

const simplePost = (req, res) => {
     res.send("Index route, Post, chat-Me")
}

const others = (req, res) => {
     res.send("Route Not Implemented")
}

module.exports = { simpleGet, simplePost, others }