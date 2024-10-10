-- Entreprises
INSERT INTO company (id, name, siret)
SELECT 1, 'Entreprise Alpha', '12345678901234'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '12345678901234');

INSERT INTO company (id, name, siret)
SELECT 2, 'Entreprise Beta', '23456789012345'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '23456789012345');

INSERT INTO company (id, name, siret)
SELECT 3, 'Entreprise Gamma', '34567890123456'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '34567890123456');

-- Référentiels - GRADES
INSERT INTO referential (id, type, value)
SELECT 1, 'GRADE', 'A'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'A');

INSERT INTO referential (id, type, value)
SELECT 2, 'GRADE', 'B'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'B');

INSERT INTO referential (id, type, value)
SELECT 3, 'GRADE', 'C'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'C');

-- Référentiels - SKILLS
INSERT INTO referential (id, type, value)
SELECT 4, 'SKILL', 'Java'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Java');

INSERT INTO referential (id, type, value)
SELECT 5, 'SKILL', 'Spring Boot'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Spring Boot');

INSERT INTO referential (id, type, value)
SELECT 6, 'SKILL', 'SQL'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'SQL');

-- Référentiels - FIELDS
INSERT INTO referential (id, type, value)
SELECT 7, 'FIELD', 'Informatique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Informatique');

INSERT INTO referential (id, type, value)
SELECT 8, 'FIELD', 'Mathématiques'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Mathématiques');

INSERT INTO referential (id, type, value)
SELECT 9, 'FIELD', 'Physique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Physique');
