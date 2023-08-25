# BFF - RestAPI backend with:

[x] koa ecosystem
[x] jwt login verification
[x] Automatically generate `swagger` interface documentation
[x] `nodemon` auto restart
[x] use `decorator` The way to complete the interface parameter verification
[x] `controller` automatic error capture
[x] `typescript` support
[x] based on `PRISMA` database

## To start the project 

1. npm i
2. docker-compose up -d
    * After uploading the docker it will be necessary to create the bank in pgadmin
3. npx prisma db push
4. npx prisma db seed

## All environment variables are in .env

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/basebackend"
PORT=8080
```