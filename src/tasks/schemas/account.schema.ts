import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task
{
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
