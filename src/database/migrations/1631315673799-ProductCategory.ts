import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductCategory1631315673799 implements MigrationInterface {
    name = 'ProductCategory1631315673799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" double NOT NULL, "type" varchar(1) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "category_product_product" ("categoryId" varchar NOT NULL, "productId" varchar NOT NULL, PRIMARY KEY ("categoryId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f30f39dd26f972ad970685e9db" ON "category_product_product" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86d08d5dfe9e7f7f44f126d190" ON "category_product_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "phone", "city", "state", "created_at", "updated_at") SELECT "id", "username", "email", "phone", "city", "state", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`DROP INDEX "IDX_f30f39dd26f972ad970685e9db"`);
        await queryRunner.query(`DROP INDEX "IDX_86d08d5dfe9e7f7f44f126d190"`);
        await queryRunner.query(`CREATE TABLE "temporary_category_product_product" ("categoryId" varchar NOT NULL, "productId" varchar NOT NULL, CONSTRAINT "FK_f30f39dd26f972ad970685e9db4" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_86d08d5dfe9e7f7f44f126d190d" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("categoryId", "productId"))`);
        await queryRunner.query(`INSERT INTO "temporary_category_product_product"("categoryId", "productId") SELECT "categoryId", "productId" FROM "category_product_product"`);
        await queryRunner.query(`DROP TABLE "category_product_product"`);
        await queryRunner.query(`ALTER TABLE "temporary_category_product_product" RENAME TO "category_product_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_f30f39dd26f972ad970685e9db" ON "category_product_product" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86d08d5dfe9e7f7f44f126d190" ON "category_product_product" ("productId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_86d08d5dfe9e7f7f44f126d190"`);
        await queryRunner.query(`DROP INDEX "IDX_f30f39dd26f972ad970685e9db"`);
        await queryRunner.query(`ALTER TABLE "category_product_product" RENAME TO "temporary_category_product_product"`);
        await queryRunner.query(`CREATE TABLE "category_product_product" ("categoryId" varchar NOT NULL, "productId" varchar NOT NULL, PRIMARY KEY ("categoryId", "productId"))`);
        await queryRunner.query(`INSERT INTO "category_product_product"("categoryId", "productId") SELECT "categoryId", "productId" FROM "temporary_category_product_product"`);
        await queryRunner.query(`DROP TABLE "temporary_category_product_product"`);
        await queryRunner.query(`CREATE INDEX "IDX_86d08d5dfe9e7f7f44f126d190" ON "category_product_product" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f30f39dd26f972ad970685e9db" ON "category_product_product" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "phone", "city", "state", "created_at", "updated_at") SELECT "id", "username", "email", "phone", "city", "state", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP INDEX "IDX_86d08d5dfe9e7f7f44f126d190"`);
        await queryRunner.query(`DROP INDEX "IDX_f30f39dd26f972ad970685e9db"`);
        await queryRunner.query(`DROP TABLE "category_product_product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
