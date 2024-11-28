import {
  Controller,
  Get,
} from '@nestjs/common';
import { FilesService } from '../services';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // @Post()
  // async create(@Body() payload: CreateFileDto) {
  //   const file = await this.filesService.create(payload);
  //   return file;
  // }

  @Get()
  async findAll() {
    const files = await this.filesService.findAll();
    return files;
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const file = await this.filesService.findOne(id);
  //   return file;
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() payload: UpdateFileDto) {
  //   const file = await this.filesService.update(id, payload);
  //   return file;
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   const file = await this.filesService.delete(id);
  //   return file;
  // }
}
