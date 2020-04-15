import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
    author_id: String,
    title: String,
    illustration: String,
    content: String,
    subtitle: String,
    created_at: { 
      type: Date, 
      default: Date.now 
    }
});