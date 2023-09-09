import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto
{
    @ApiProperty()
    @Length(1, 100)
    title: string;

    @ApiProperty()
    @Length(1, 1500)
    description: string;

    @ApiProperty()
    done: boolean;
}
