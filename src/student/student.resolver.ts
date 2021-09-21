import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

/**
 * Create a mutation:
 *
 * accepts -> createStudentInput
 *
 * service -> createStudent
 *
 * Mongodb -> saved :)
 */
@Resolver((_of) => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query((_of) => StudentType)
    getStudent(@Args('id') id: string): Promise<Student> {
        return this.studentService.getStudent(id);
    }

    @Query((_of) => [StudentType])
    getStudents(): Promise<Student[]> {
        return this.studentService.getStudents();
    }

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentDto,
    ): Promise<Student> {
        return this.studentService.createStudent(createStudentInput);
    }
}
