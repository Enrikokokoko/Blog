import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from '../dtos/CreateComment.dto';
import { CommentsService } from '../services/comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {

    constructor(readonly commentService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':id/comments')
    addCommentToPost(@Param('id') id: number, @Body() createCommentDto: CreateCommentDto) {
        return this.commentService.addCommentToPost(id, createCommentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findAllcomments(@Param('id') id: number) {
        return this.commentService.getAllcommentsUnderPost(id)
    }
}
