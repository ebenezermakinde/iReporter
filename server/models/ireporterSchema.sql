\c ireporter
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id UUID PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  othernames VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phonenumber VARCHAR(50),
  username VARCHAR(200) NOT NULL,
  registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  isadmin BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS incidents;
CREATE TABLE incidents (
  id UUID PRIMARY KEY,
  createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  createdby UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(25) DEFAULT 'draft',
  type VARCHAR(13) NOT NULL,
  location TEXT NOT NULL,
  images TEXT,
  videos TEXT,
  comment TEXT NOT NULL,
  CONSTRAINT check_type check (type in('red-flag','intervention'))
);