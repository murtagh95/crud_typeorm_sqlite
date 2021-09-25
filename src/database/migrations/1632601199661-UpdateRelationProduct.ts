import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRelationProduct1632601199661 implements MigrationInterface {
    name = 'UpdateRelationProduct1632601199661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "category_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "category_fk_id") SELECT "id", "name", "price", "type", "category_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar, CONSTRAINT "FK_aa68e9199b707d3025ae773b5be" FOREIGN KEY ("category_fk_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "category_fk_id") SELECT "id", "name", "price", "type", "category_fk_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "category_fk_id") SELECT "id", "name", "price", "type", "category_fk_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "category_fk_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar, CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "category_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
    }

}
