import request from 'request';
import New from '../models/New';
import DeletedNew from '../models/DeletedNew';

const url = "http://hn.algolia.com/api/v1/search_by_date?query=nodejs";

const createStory = (story) => {
    story.story_id = story.objectID;
    let newFromApi = new New(story);
    newFromApi.save();
}

const checkStoryDoesNotExist = async (story) => {
   let stories = await New.find({ story_id: story.objectID }).exec();
   return (stories.length == 0) ? true : false; 
}

const checkStoryHasNotBeenRemoved = async (story) => {
    let stories = await DeletedNew.find({ story_id: story.objectID}).exec();
    return (stories.length == 0) ? true : false; 
}

const saveNews = (news) => {
    news.forEach( story => {
        if( (story.title || story.story_title) && (story.url || story.story_url)){
            story.title = story.title || story.story_title;
            story.url = story.url || story.story_url
            
            checkStoryDoesNotExist(story).then( isNewStory => {
                if( isNewStory ){
                    return checkStoryHasNotBeenRemoved(story);
                }
            }).then( wasNotRemoved => {
                if( wasNotRemoved ){
                    createStory(story);
                }
            });
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