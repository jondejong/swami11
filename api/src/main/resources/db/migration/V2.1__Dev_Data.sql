-- Turn this off when going to prod

INSERT INTO week (number, started, locked, completed)
VALUES (1, FALSE, FALSE, FALSE);

INSERT INTO week (number, started, locked, completed)
VALUES (2, FALSE, FALSE, FALSE);

INSERT INTO user_week (id, swami_user, week, ncaa_games, nfl_games, submitted)
VALUES (
  '3b9d370c-4058-4218-a597-19b64f98cfc0',
  'd43e5e9d-972b-4123-b73d-aaa22ddc07ec',
  1,
  5,
  0,
  false
);

INSERT INTO swami_user (id, first_name, last_name, email, password, admin, salt, token) VALUES ('8a6bf66c-0ba9-4c2b-b18d-1fec7158435c', 'Jonny', 'User', 'user@test.com', 'cZr5h7vM2QvDYYGQMf9a83GrpOEdhytd79MPIfzhBzU=', false, '4b7b91e1-3280-4417-b265-918ec9d36a04', null);
