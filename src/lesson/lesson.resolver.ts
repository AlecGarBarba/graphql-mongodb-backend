import { NotFoundException } from '@nestjs/common';
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { AssignStudentsToLessonDto } from './dto/assign-students-to-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) {}

    @Query((_returns) => LessonType)
    async getLesson(@Args('id') id: string) {
        const lesson = await this.lessonService.getLesson(id);
        if (lesson) {
            return lesson;
        }
        throw new NotFoundException(`Could not find lesson with id: ${id}`);
    }

    @Query((_returns) => [LessonType])
    getLessons() {
        return this.lessonService.getLessons();
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonDto,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation((returns) => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput')
        assignStudentsToLessonInput: AssignStudentsToLessonDto,
    ) {
        return this.lessonService.assignStudentsToLesson(
            assignStudentsToLessonInput,
        );
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}
