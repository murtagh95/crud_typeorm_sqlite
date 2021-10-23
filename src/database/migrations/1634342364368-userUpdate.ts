import {MigrationInterface, QueryRunner} from "typeorm";

export class userUpdate1634342364368 implements MigrationInterface {
    name = 'userUpdate1634342364368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "gender" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "created_at", "updated_at", "username", "email", "phone", "city", "state") SELECT "id", "created_at", "updated_at", "username", "email", "phone", "city", "state" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "created_at", "updated_at", "username", "email", "phone", "city", "state") SELECT "id", "created_at", "updated_at", "username", "email", "phone", "city", "state" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
