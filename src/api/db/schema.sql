DROP TABLE IF EXISTS results;

CREATE TABLE results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    resultTeam1 TEXT NOT NULL,
    resultTeam2 TEXT NOT NULL
);