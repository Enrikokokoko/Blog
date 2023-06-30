import { Body, Controller, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { UpdateTagDto } from './dtos/UpdateTag.dto';

@Controller('tags')
export class TagsController {
    
    constructor(private readonly tagsService: TagsService) {}

    @Post('tag/:id')
    async AddTagsToPost(@Param('id') id: number, @Body() tag: UpdateTagDto) {
        return this.tagsService.AddTagsToPost(id, tag)
    }

}
