import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
    authorId: String,
    title: String,
    illustration: String,
    content: String,
    subtitle: String,
    published: Boolean,
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
});