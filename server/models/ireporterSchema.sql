\c ireporter

DROP TABLE IF EXISTS incidents;
CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(25) DEFAULT 'draft',
  type VARCHAR(13) NOT NULL,
  location TEXT NOT NULL,
  images TEXT,
  videos TEXT,
  comment TEXT NOT NULL,
  CONSTRAINT check_type check (type in('red-flag','intervention'))
);

INSERT INTO incidents(type,location,comment)
VALUES('red-flag','okokomaiko','bad roads');