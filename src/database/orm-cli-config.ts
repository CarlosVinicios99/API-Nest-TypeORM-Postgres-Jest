import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1736095147864 } from "src/migrations/1736095147864-CreateCoursesTable";
import { CreateTagsTable1736096942298 } from "src/migrations/1736096942298-CreateTagsTable";
import { CreateCoursesTagsTable1736098557888 } from "src/migrations/1736098557888-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1736099386376 } from "src/migrations/1736099386376-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1736100429108 } from "src/migrations/1736100429108-AddTagsIdToCoursesTagsTable";
import { Tag } from "src/courses/entities/tag.entity";
import { Course } from "src/courses/entities/course.entity";
import 'dotenv/config'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1736095147864, 
    CreateTagsTable1736096942298,
    CreateCoursesTagsTable1736098557888,
    AddCoursesIdToCoursesTagsTable1736099386376,
    AddTagsIdToCoursesTagsTable1736100429108
  ]
})