import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newModel = new Schema({
    title: { type: String   },
    author: { type: String },
    created_at: {type: String},
    url: {type: String},
});

export default mongoose.model('news', newModel)