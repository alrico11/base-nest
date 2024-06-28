import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SopService } from './sop.service';
import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';

@Controller('sop')
export class SopController {
  constructor(private readonly sopService: SopService) {}

  @Post()
  create(@Body() createSopDto: CreateSopDto) {
    return this.sopService.create(createSopDto);
  }

  @Get()
  findAll() {
    return this.sopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSopDto: UpdateSopDto) {
    return this.sopService.update(+id, updateSopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sopService.remove(+id);
  }
}
