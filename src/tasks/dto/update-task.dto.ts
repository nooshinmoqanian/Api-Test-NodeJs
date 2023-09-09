import { IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto
{
    @ApiProperty()
    @Length(1, 100)
    @IsOptional()
    title: string;

    @ApiProperty()
    @Length(1, 1500)
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    done: boolean;
}
