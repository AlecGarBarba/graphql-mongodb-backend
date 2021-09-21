import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}

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
}
