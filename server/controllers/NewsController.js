import New from '../models/New';

class NewsController{

    async getAll(req, res){
        const news = await New.find({}).sort({ created_at: 'desc'}).exec();
        res.json(news);
    }

    mockdb(req, res){
        const news = [
            {title: "WordPress 4.3 willbe rewritten in Node.js.", author:"Garbage", created_at: 1536289502, url: "http://google.com"},
            {title: 'A Simple "Hello World" Built on Objective-C and Executed with Node.js.', author:"vrunoa", created_at: 1536244634, url: "https://google.com"},
            {title: "Amazon Business.", author: "fragmede", created_at: 1536244634, url: "https://google.com"},
            {title: "the People Who risk Jail to Maintain the Tor Network", author: "mirimir", created_at: 1535969954, url: "http://google.com"},
            {title: "Blinking LED using Elixir Embedded Image on Raspberry Pi", author: "joezydeco", created_at: 1535969954, url: "https://google.com"},
            {title: "Polyglot Weekly: A Rust Contributor Tries Their Hand at Go", author: "BenjaminCoe", created_at: 1535969954, url: "https://google.com"},
            {title: "Nagios vs Iciga: the story of one of the most heated forks in free software", author: "newsvatore", created_at: 1535969954, url: "http://google.com"}
        ];
        news.forEach( n => {
            let news = new New(n);
            news.save();
        });
        res.status(200).send({message: 'ok'});
    }

    async removeAll(req, res){
        const queryResponde = await New.deleteMany({}).exec();
        res.status(200).send({message: 'ok'});
    }
}

export default NewsController;