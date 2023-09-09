import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController
{
    constructor(private readonly tasksService: TasksService)
    {}

    @Post('create')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async create(@Body() createTaskDto: CreateTaskDto)
    {
        return this.tasksService.create(createTaskDto);
    }

    @Get('find-all')
    public async findAll()
    {
        return this.tasksService.findAll();
    }

    @Get('find-one/:id')
    public async findOne(@Param('id') id: string)
    {
        return this.tasksService.findOne(id);
    }

    @Delete('remove/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async remove(@Param('id') id: string)
    {
        return this.tasksService.remove(id);
    }

    @Put('update/:id')
    @ApiSecurity('JsonWebToken')
    @UseGuards(AuthGuard)
    public async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto)
    {
        return this.tasksService.update(id, updateTaskDto);
    }
}
