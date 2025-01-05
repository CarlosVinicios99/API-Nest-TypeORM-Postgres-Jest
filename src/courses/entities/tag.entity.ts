import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { randomUUID } from "crypto";

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToMany(() => Course, course => course.tags)
  courses: Course[]

  @CreateDateColumn({name: 'created_at', type: 'timestamp'})
  createdAt: Date


  @BeforeInsert()
  generatedId(){
    if(this.id){
      return
    }
    this.id = randomUUID()
  }
}