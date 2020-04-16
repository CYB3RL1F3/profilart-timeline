import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
    authorId: String,
    title: String,
    illustration: String,
    content: String,
    subtitle: String,
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});