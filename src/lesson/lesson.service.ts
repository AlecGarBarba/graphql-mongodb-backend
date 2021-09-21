import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { AssignStudentsToLessonDto } from './dto/assign-students-to-lesson.dto';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id: id }); //curly braces for our own id, not mongodb _id
    }

    async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonDto;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name: name,
            startDate,
            endDate,
            students,
        });

        return this.lessonRepository.save(lesson);
    }

    getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async assignStudentsToLesson(
        assignStudentsToLessonInput: AssignStudentsToLessonDto,
    ): Promise<Lesson> {
        const { lessonId, studentsIds } = assignStudentsToLessonInput;
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        if (lesson.students) {
            lesson.students = [...lesson.students, ...studentsIds];
        } else {
            lesson.students = studentsIds;
        }

        return this.lessonRepository.save(lesson);
    }

    
}
