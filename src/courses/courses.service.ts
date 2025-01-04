import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}

  private async preloadTagByName(name: string): Promise<Tag> {

    const tag: Tag = await this.tagRepository.findOne({
      where: {
        name
      }
    })

    if(tag){
      return tag
    }

    return this.tagRepository.create({name})
  }

  async findAll(){
    return await this.courseRepository.find({
      relations: ['tags']
    })
  }

  async findOne(id: number){

    const course: Course = await this.courseRepository.findOne({
      where: {
        id
      },
      relations: ['tags']
    })

    if(!course){
      throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return course
  }

  async create(createCourseDTO: CreateCourseDTO){   

    const tags: Tag[] = await Promise.all(createCourseDTO.tags.map(name => this.preloadTagByName(name)))

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags
    })
    return await this.courseRepository.save(course)
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO){

    const tags: Tag[] = 
    updateCourseDTO.tags &&
    (await Promise.all(updateCourseDTO.tags.map(name => this.preloadTagByName(name))))

    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags
    })

    if(!course){
      throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return this.courseRepository.save(course)
  }

  async remove(id: number){

    const course: Course = await this.courseRepository.findOne({
      where: {
        id
      }
    })

    if(!course){
      throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return await this.courseRepository.remove(course)
  }
}
