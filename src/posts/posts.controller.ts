// ./src/posts/posts.controller.ts
import { Controller, Request, Get, Res, HttpStatus, Post, Body, Patch, NotFoundException, Delete, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDTO, UpdatePostDTO } from './posts.dto';
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
    async addPosts(@Request() req, @Res() res, @Body() createPostsDTO: CreatePostsDTO) {
        if (!createPostsDTO.authorId) createPostsDTO.authorId = req.user.uid;
        if (req.user.uid !== createPostsDTO.authorId) throw new UnauthorizedException("You can't add posts for another user");
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
    @Patch('/:postId')
    @UseGuards(JwtAuthGuard)
    async updatePosts(@Request() req, @Res() res, @Param('postId') postId, @Body() updatePostDTO: UpdatePostDTO) {
        const postToUpdate = await this.postsService.getPosts(postId);
        if (!postToUpdate) throw new NotFoundException('Post does not exist');
        if (postToUpdate.authorId !== req.user.uid) throw new UnauthorizedException('You are not allowed to update this post');
        const posts = await this.postsService.updatePosts(postId, {
            ...updatePostDTO,
            updatedAt: new Date()
        });
        if (!posts) throw new NotFoundException('Posts does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Posts has been successfully updated',
            posts
        });
    }

    // Update a posts's details
    @Patch('/:postId/publish')
    @UseGuards(JwtAuthGuard)
    async publishPost(@Request() req, @Res() res, @Param('postId') postId) {
        const postToUpdate = await this.postsService.getPosts(postId);
        if (!postToUpdate) throw new NotFoundException('Post does not exist');
        if (postToUpdate.authorId !== req.user.uid) throw new UnauthorizedException('You are not allowed to update this post');
        const posts = await this.postsService.updatePosts(postId, {
            ...postToUpdate,
            published: true,
            updatedAt: new Date()
        });
        if (!posts) throw new NotFoundException('Posts does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Posts has been successfully updated',
            posts
        });
    }

    // Delete a posts
    @Delete('/:postId')
    @UseGuards(JwtAuthGuard)
    async deletePosts(@Request() req, @Res() res, @Param('postId') postId) {
        const postToDelete = await this.postsService.getPosts(postId);
        if (!postToDelete) throw new NotFoundException('Post does not exist');
        if (postToDelete.authorId !== req.user.uid) throw new UnauthorizedException('You are not allowed to delete this post');
        
        const posts = await this.postsService.deletePosts(postId);
        if (!posts) throw new NotFoundException('Posts does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted',
            posts
        })
    }
}