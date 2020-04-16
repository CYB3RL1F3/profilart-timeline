import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from './posts.interface';
import { CreatePostsDTO } from './posts.dto';


@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly postModel: Model<Posts>) { }
    
    getAllPosts = async (): Promise<Posts[]> => 
      await this.postModel.find().exec();
    
    getPosts = async (postId: string): Promise<Posts> => 
      await this.postModel.findById(postId).exec();

    getPostsByAuthor = async (authorId: string): Promise<Posts> =>
      await this.postModel.find({
        author_id: authorId
      }).exec();
    
    addPosts = async (createPostsDTO: CreatePostsDTO): Promise<Posts> => {
        const posts = await this.postModel(createPostsDTO);
        return posts.save();
    }

    updatePosts = async (postId: string, createPostsDTO: CreatePostsDTO): Promise<Posts> =>
      await this.postModel.findByIdAndUpdate(postId, createPostsDTO, { new: true });

    deletePosts = async (postId: string): Promise<any> =>
      await this.postModel.findByIdAndRemove(postId);
}