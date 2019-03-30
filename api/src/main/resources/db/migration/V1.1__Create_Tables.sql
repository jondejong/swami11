CREATE TABLE conference
(
  id   UUID UNIQUE,
  name TEXT
);

CREATE TABLE team
(
  id         UUID UNIQUE,
  name       TEXT,
  nick_name  TEXT,
  conference UUID REFERENCES conference (id)
);

CREATE TABLE swami_user
(
  id         UUID UNIQUE,
  first_name TEXT,
  last_name  TEXT,
  email      TEXT UNIQUE,
  password   TEXT,
  admin      BOOLEAN default false,
  salt       UUID,
  token      UUID
);

CREATE TABLE week
(
  number    NUMERIC UNIQUE,
  started   BOOLEAN,
  locked    BOOLEAN,
  completed BOOLEAN
);

CREATE TABLE game
(
  id     UUID UNIQUE,
  week   NUMERIC REFERENCES week (number),
  spread NUMERIC,
  day    TEXT
);

CREATE TABLE selection
(
  id       UUID UNIQUE,
  team     UUID REFERENCES team (id),
  game     UUID REFERENCES game (id),
  home     BOOLEAN,
  favorite BOOLEAN
);

CREATE TABLE user_week
(
  id         UUID UNIQUE,
  swami_user UUID REFERENCES swami_user (id),
  week       NUMERIC REFERENCES week (number),
  ncaa_games NUMERIC,
  nfl_games  NUMERIC,
  submitted  BOOLEAN
);

CREATE TABLE user_week_selection
(
  selection UUID REFERENCES selection (id),
  user_week UUID REFERENCES user_week (id)
);

CREATE TABLE user_week_watched
(
  selection UUID REFERENCES selection (id),
  user_week UUID REFERENCES user_week (id)
);