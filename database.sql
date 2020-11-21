CREATE TABLE todos(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(250),
    "completed" BOOLEAN,
    "complete_time" VARCHAR(100) DEFAULT ''
    );

UPDATE todos SET completed=$1 complete_time=$2 WHERE id=$3;
