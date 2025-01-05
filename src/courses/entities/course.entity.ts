import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"
import { randomUUID } from "crypto"

@Entity('courses')
export class Course {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn({name: 'created_at', type: 'timestamp'})
  createdAt: Date

  @JoinTable()
  @ManyToMany(() => Tag, tag => tag.courses, {cascade: true})
  tags: Tag[]


  @BeforeInsert()
  generatedId(){
    if(this.id){
      return
    }
    this.id = randomUUID()
  }
}