import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1632605378560 implements MigrationInterface {
    name = 'CreateDB1632605378560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar, CONSTRAINT "FK_aa68e9199b707d3025ae773b5be" FOREIGN KEY ("category_fk_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "created_at", "updated_at", "name", "price", "type", "category_fk_id") SELECT "id", "created_at", "updated_at", "name", "price", "type", "category_fk_id" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL, "category_fk_id" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "created_at", "updated_at", "name", "price", "type", "category_fk_id") SELECT "id", "created_at", "updated_at", "name", "price", "type", "category_fk_id" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
