import request from 'request';
import New from '../models/New';

const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";

export const getNews = () => {
     return new Promise((resolve,reject) => {
        request(url, (err, res, body) => {
            if( err ){
                console.log(err);
                rej(err);
            }
            try{
                let jsonBody = JSON.parse(body);
                jsonBody.hits.forEach( n => {
                    let newFromApi = new New(n);
                    newFromApi.save();
                });
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