// ./src/posts/posts.controller.ts
import { Controller, Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDTO } from './posts.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Get()
    async getAllPosts(@Res() res) {
        const posts = await this.postsService.getAllPosts();
        return res.status(HttpStatus.OK).json(posts);
    }
    
    @Post()
    @UseGuards(JwtAuthGuard)
    async addPosts(@Res() res, @Body() createPostsDTO: CreatePostsDTO) {
        const posts = await this.postsService.addPosts(createPostsDTO);
        return res.status(HttpStatus.OK).json({
            message: "Posts has been added successfully",
            posts
        })
    }

    @Get('/:postId')
    async getPosts(@Res() res, @Param('postId') postId) {
        const posts = await this.postsService.getPosts(postId);
        if (!posts) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(posts);
    }

    // Fetch posts of author
    @Get('/of/:authorId')
    async getPostsOfAuthor(@Res() res, @Param('authorId') authorId) {
        const posts = await this.postsService.getPostsByAuthor(authorId);
        if (!posts) throw new NotFoundException('Author don\'t have posts!');
        return res.status(HttpStatus.OK).json(posts);
    }

    // Update a posts's details
    @Put('/:postId')
    @UseGuards(JwtAuthGuard)
    async updatePosts(@Res() res, @Param('postId') postId, @Body() createPostsDTO: CreatePostsDTO) {
        const posts = await this.postsService.updatePosts(postId, createPostsDTO);
        if (!posts) throw new NotFoundException('Posts does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Posts has been successfully updated',
            posts
        });
    }

    // Delete a posts
    @Delete('/:postId')
    @UseGuards(JwtAuthGuard)
    async deletePosts(@Res() res, @Param('postId') postID) {
        const posts = await this.postsService.deletePosts(postID);
        if (!posts) throw new NotFoundException('Posts does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted',
            posts
        })
    }
}