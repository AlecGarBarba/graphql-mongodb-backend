import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((_of) => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}

    @Query((_returns) => LessonType)
    getLesson(@Args('id') id: string) {
        return this.lessonService.getLesson(id);
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,
    ) {
        return this.lessonService.createLesson({
            name,
            startDate,
            endDate,
        });
    }
}