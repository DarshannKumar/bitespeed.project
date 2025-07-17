CREATE TABLE IF NOT EXISTS Contact (
  id SERIAL PRIMARY KEY,
  phoneNumber VARCHAR(20),
  email VARCHAR(255),
  linkedId INT REFERENCES Contact(id),
  linkPrecedence VARCHAR(10) CHECK (linkPrecedence IN ('primary', 'secondary')) DEFAULT 'primary',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP
);
