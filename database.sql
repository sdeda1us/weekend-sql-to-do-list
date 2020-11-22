CREATE TABLE todos(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(250),
    "completed" BOOLEAN,
    "complete_time" VARCHAR(100) DEFAULT ''
    );

