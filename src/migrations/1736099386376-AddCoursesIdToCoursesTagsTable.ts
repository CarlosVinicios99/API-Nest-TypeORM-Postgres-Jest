import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCoursesIdToCoursesTagsTable1736099386376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'course_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_courses',
                columnNames: ['course_id'],
                referencedTableName: 'courses',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'courses_tag',
            'courses_tags_courses'
        )

        await queryRunner.dropColumn(
            'courses_tags',
            'course_id'
        )
    }

}
