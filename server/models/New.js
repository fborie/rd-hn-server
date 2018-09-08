import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newModel = new Schema({
    story_id:{type: String},
    title: {type: String},
    author: {type: String},
    created_at: {type: String},
    url: {type: String},
});

export default mongoose.model('New', newModel);