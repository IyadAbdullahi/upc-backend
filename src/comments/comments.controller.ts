import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { commentDto } from './dto/commentDto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService){}

    @Post()
    createComment(@Body('comment') comment: string){
        return this.commentService.creatComment(1, comment)
    }

    @Get(':id')
    getById(@Param('id') id:number){
        return this.commentService.getById(id);
    }

    @Get()
    getAll(){
        return this.commentService.getAll()
    }

    @Delete(':id')
    deleteComment(@Param('id') id:number){
        return this.commentService.deleteComment(id);
    }

}
