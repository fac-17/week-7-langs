BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_hash VARCHAR(100) NOT NULL
);

INSERT INTO users (user_name, user_hash) VALUES ('gigi', '$2a$10$hn/9c0ViiDgJHDZhByRR/eFLETd0rwCjWB285pCH0uvF.s8I3G7.u');


COMMIT;
