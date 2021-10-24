import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddRole1635033876318 implements MigrationInterface {
    name = 'userAddRole1635033876318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar, "state" varchar, "password" varchar NOT NULL, "name" varchar, "lastname" varchar, "gender" varchar, "is_admin" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "created_at", "updated_at", "username", "email", "phone", "city", "state", "password", "name", "lastname", "gender") SELECT "id", "created_at", "updated_at", "username", "email", "phone", "city", "state", "password", "name", "lastname", "gender" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar, "state" varchar, "password" varchar NOT NULL, "name" varchar, "lastname" varchar, "gender" varchar)`);
        await queryRunner.query(`INSERT INTO "users"("id", "created_at", "updated_at", "username", "email", "phone", "city", "state", "password", "name", "lastname", "gender") SELECT "id", "created_at", "updated_at", "username", "email", "phone", "city", "state", "password", "name", "lastname", "gender" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
