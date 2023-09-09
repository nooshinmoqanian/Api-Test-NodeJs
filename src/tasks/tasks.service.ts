import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/account.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { ObjectId } from 'mongodb';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService
{
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>)
    {
    }

    public async create(createTaskDto: CreateTaskDto)
    {
        const { title, description, done } = createTaskDto;

        await this.taskModel.create({ title, description, done });

        return { message: 'Task created successfully' };
    }

    public async findAll()
    {
        return this.taskModel.find();
    }

    public async findOne(id: string)
    {
        if (!ObjectId.isValid(id))
            return { message: 'Invalid Object Id' };

        const task = await this.taskModel.findOne({ _id: id });
        if (!task)
            return { message: 'Task Not Found' };

        return { task };
    }

    public async remove(id: string)
    {
        if (!ObjectId.isValid(id))
            return { message: 'Invalid Object Id' };

        const task = await this.taskModel.deleteOne({ _id: id });
        if (!task)
            return { message: 'Task Not Found' };

        return { message: 'Task deleted successfully' };
    }

    public async update(id: string, updateTaskDto: UpdateTaskDto)
    {
        const { title, description, done } = updateTaskDto;

        if (!ObjectId.isValid(id))
            return { message: 'Invalid Object Id' };

        const task = await this.taskModel.updateOne({ _id: id }, { title, description, done });
        if (!task)
            return { message: 'Task Not Found' };

        return { message: 'Task updated successfully' };
    }
}
