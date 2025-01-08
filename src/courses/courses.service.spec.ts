import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { randomUUID } from 'node:crypto';
import { CreateCourseDTO } from './dto/create-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;

  let id: string
  let createdAt: Date
  let expectOutputTags: any
  let expectOutputCourses: any
  let mockCourseRepository: any
  let mockTagsRepository: any

  beforeEach(async () => {
    service = new CoursesService()

    id = randomUUID()
    createdAt = new Date()

    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        createdAt
      }
    ]

    expectOutputCourses = {
      id,
      name: 'test',
      description: 'test descriptions',
      createdAt,
      tags: expectOutputTags
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    }

  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a course', async () => {

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

     //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const newCourse = await service.create(createCourseDTO)

    
    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)

  });

  
  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagsRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)
  })

});
