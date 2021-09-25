import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRelationProductToCategory1632600961021 implements MigrationInterface {
    name = 'UpdateRelationProductToCategory+1632600961021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "categoryId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "categoryId") SELECT "id", "name", "price", "type", "categoryId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "categoryId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar, CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "category_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_id" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "category_id") SELECT "id", "name", "price", "type", "category_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "categoryId" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "categoryId") SELECT "id", "name", "price", "type", "category_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "categoryId" varchar, CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "type", "categoryId") SELECT "id", "name", "price", "type", "categoryId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
    }

}
