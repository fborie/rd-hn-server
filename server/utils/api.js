import request from 'request';
import New from '../models/New';

const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";

const saveNews = (news) => {
    news.forEach( n => {
        if( (n.title || n.story_title) && (n.url || n.story_url)){
            n.title = n.title || n.story_title;
            n.url = n.url || n.story_url
            let newFromApi = new New(n);
            newFromApi.save();
        }
    });
}

export const getNews = () => {
     return new Promise((resolve,reject) => {
        request(url, (err, res, body) => {
            if( err ){
                console.log(err);
                rej(err);
            }
            try{
                const jsonBody = JSON.parse(body);
                const news = jsonBody.hits;
                saveNews(news);
                resolve();
            }catch(e){
                console.log('[json parse exception]: ', e);
                reject(e);
            }
        });
    })
};

export const getNewsEveryHour = () => {
    const timeoutId = setInterval( ()=> {
        console.log('interval call');
        getNews();
    }, 3600000);
    return timeoutId;
}