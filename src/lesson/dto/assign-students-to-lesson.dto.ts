import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonDto {
    @IsUUID()
    @Field((type) => ID)
    lessonId: string;

    @IsUUID('4', { each: true }) //check version 4 uuids :), validate each of 'em
    @Field((type) => [ID])
    studentsIds: string[];
}
