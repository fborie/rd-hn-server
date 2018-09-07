import express from 'express';

const newsRouter = express.Router();

const news = [
    {title: "WordPress 4.3 willbe rewritten in Node.js.", author:"Garbage", created_at: 1536289502},
    {title: 'A Simple "Hello World" Built on Objective-C and Executed with Node.js.', author:"vrunoa", created_at: 1536244634},
    {title: "Amazon Business.", author: "fragmede", created_at: 1536244634},
    {title: "the People Who risk Jail to Maintain the Tor Network", author: "mirimir", created_at: 1535969954},
    {title: "Blinking LED using Elixir Embedded Image on Raspberry Pi", author: "joezydeco", created_at: 1535969954},
    {title: "Polyglot Weekly: A Rust Contributor Tries Their Hand at Go", author: "BenjaminCoe", created_at: 1535969954},
    {title: "Nagios vs Iciga: the story of one of the most heated forks in free software", author: "newsvatore", created_at: 1535969954}
]

newsRouter
    .get('/', (req,res) => {
        res.json(news);
    });

export default newsRouter;