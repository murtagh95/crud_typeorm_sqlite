# CRUD Node.js 
# Catalano Nicolas
CRUD made with Node.js, Express, TypeScript, TypeORM, EJS &amp; SQLite.

![Home page image](https://github.com/sinvalbsneto/crud_nodejs/blob/main/public/img/home.png)

## How to run in docker:
- Clone the repository.
- Run `docker-compose up --buid` 
- If the server throws `ERROR: ER_NOT_SUPPORTED_AUTH_MODE`, the following steps should be followed:
    - Enter mysql container with command: `docker exec -it type-db mysql -p`
    - Enter the password
    - Execute the following commands, where it says password to put the one defined there:
        - `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
        - `flush privileges;`
    - Stop docker-compose
    - Run `docker-compose up --buid`
    - If it still fails to run everything back just without it `@'localhost'`
- Run `docker exec type-server npm run typeorm migration:run` to run the migrations.


## Create a .env file and paste the following text 
```

# NGINX
APP_PORT=
SERVER_NAME=

```
