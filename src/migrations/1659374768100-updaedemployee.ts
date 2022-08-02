import {MigrationInterface, QueryRunner} from "typeorm";

export class updaedemployee1659374768100 implements MigrationInterface {
    name = 'updaedemployee1659374768100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
