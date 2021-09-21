import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {} from 'class-validator';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id });
        const student = this.studentRepository.findOne({ id });

        if (student) {
            return student;
        }
        throw new NotFoundException(`Student with id: ${id} not found`);
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { firstName, lastName } = createStudentDto;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
        });

        return this.studentRepository.save(student);
    }
}
