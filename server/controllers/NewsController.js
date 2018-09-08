import New from '../models/New';
import DeletedNew from '../models/DeletedNew';

const getStoryCopy = (story) => {
    return { 
        story_id: story.story_id,
        title: story.title,
        author: story.author,
        created_at: story.created_at,
        url: story.url
    }
};

class NewsController{

    constructor(){
        this.remove = this.remove.bind(this);
    }

    async getAll(req, res){
        const news = await New.find({}).sort({ created_at: 'desc'}).exec();
        return res.status(200).json(news);
    }

    async remove(req, res, next){
        let story = await New.findOneAndDelete({ story_id: req.body.id}).exec();
        if( story === null ){
            return res.status(200).json({message:"story removed already"});
        }
        story = getStoryCopy(story);
        let deletedNew = new DeletedNew(story);
        try{
            let result = await deletedNew.save();
            return res.status(200).json(result);
        }
        catch(err){
            return next(err);
        }
    }

    async removeAll(req, res){
        const queryResponde = await New.deleteMany({}).exec();
        res.status(200).send({message: 'ok'});
    }
}

export default NewsController;