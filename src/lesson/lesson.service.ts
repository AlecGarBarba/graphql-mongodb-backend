import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    ) {}

    async getLesson(id: string): Promise<Lesson> {
        console.log(id);
        return this.lessonRepository.findOne({ id: id }); //curly braces for our own id, not mongodb _id
    }

    async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonDto;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name: name,
            startDate,
            endDate,
        });

        return await this.lessonRepository.save(lesson);
    }
}
