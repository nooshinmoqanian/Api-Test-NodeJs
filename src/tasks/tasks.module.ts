import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/account.schema';
import { Account, AccountSchema } from '../auth/schemas/account.schema';

@Module
({
    imports:
    [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }, { name: Account.name, schema: AccountSchema }]),
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule
{
}
