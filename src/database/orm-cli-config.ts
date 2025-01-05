import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1736095147864 } from "src/migrations/1736095147864-CreateCoursesTable";
import { CreateTagsTable1736096942298 } from "src/migrations/1736096942298-CreateTagsTable";
import { CreateCoursesTagsTable1736098557888 } from "src/migrations/1736098557888-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1736099386376 } from "src/migrations/1736099386376-AddCoursesIdToCoursesTagsTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1736095147864, 
    CreateTagsTable1736096942298,
    CreateCoursesTagsTable1736098557888,
    AddCoursesIdToCoursesTagsTable1736099386376
  ]
})