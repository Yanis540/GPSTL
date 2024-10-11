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

INSERT INTO company (id, name, siret)
SELECT 4, 'Entreprise Delta', '45678901234567'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '45678901234567');

INSERT INTO company (id, name, siret)
SELECT 5, 'Entreprise Epsilon', '56789012345678'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '56789012345678');

INSERT INTO company (id, name, siret)
SELECT 6, 'Entreprise Zeta', '67890123456789'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '67890123456789');

INSERT INTO company (id, name, siret)
SELECT 7, 'Entreprise Eta', '78901234567890'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '78901234567890');

INSERT INTO company (id, name, siret)
SELECT 8, 'Entreprise Theta', '89012345678901'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '89012345678901');

INSERT INTO company (id, name, siret)
SELECT 9, 'Entreprise Iota', '90123456789012'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '90123456789012');

INSERT INTO company (id, name, siret)
SELECT 10, 'Entreprise Kappa', '01234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '01234567890123');

INSERT INTO company (id, name, siret)
SELECT 11, 'Entreprise Lambda', '11234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '11234567890123');

INSERT INTO company (id, name, siret)
SELECT 12, 'Entreprise Mu', '12234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '12234567890123');

INSERT INTO company (id, name, siret)
SELECT 13, 'Entreprise Nu', '13234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '13234567890123');

INSERT INTO company (id, name, siret)
SELECT 14, 'Entreprise Xi', '14234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '14234567890123');

INSERT INTO company (id, name, siret)
SELECT 15, 'Entreprise Omicron', '15234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '15234567890123');

INSERT INTO company (id, name, siret)
SELECT 16, 'Entreprise Pi', '16234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '16234567890123');

INSERT INTO company (id, name, siret)
SELECT 17, 'Entreprise Rho', '17234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '17234567890123');

INSERT INTO company (id, name, siret)
SELECT 18, 'Entreprise Sigma', '18234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '18234567890123');

INSERT INTO company (id, name, siret)
SELECT 19, 'Entreprise Tau', '19234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '19234567890123');

INSERT INTO company (id, name, siret)
SELECT 20, 'Entreprise Upsilon', '20234567890123'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '20234567890123');

-- Référentiels - GRADES
INSERT INTO referential (id, type, value)
SELECT 1, 'GRADE', 'Bac+1'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+1');

INSERT INTO referential (id, type, value)
SELECT 2, 'GRADE', 'Bac+2'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+2');

INSERT INTO referential (id, type, value)
SELECT 3, 'GRADE', 'Bac+3'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+3');

INSERT INTO referential (id, type, value)
SELECT 4, 'GRADE', 'Bac+4'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+4');

INSERT INTO referential (id, type, value)
SELECT 5, 'GRADE', 'Bac+5'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+5');

INSERT INTO referential (id, type, value)
SELECT 6, 'GRADE', 'Bac+6'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+6');

INSERT INTO referential (id, type, value)
SELECT 7, 'GRADE', 'Bac+7'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+7');

INSERT INTO referential (id, type, value)
SELECT 8, 'GRADE', 'Bac+8'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+8');

-- Référentiels - SKILLS
INSERT INTO referential (id, type, value)
SELECT 9, 'SKILL', 'Java'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Java');

INSERT INTO referential (id, type, value)
SELECT 10, 'SKILL', 'Spring Boot'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Spring Boot');

INSERT INTO referential (id, type, value)
SELECT 11, 'SKILL', 'SQL'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'SQL');

INSERT INTO referential (id, type, value)
SELECT 12, 'SKILL', 'Python'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Python');

INSERT INTO referential (id, type, value)
SELECT 13, 'SKILL', 'Docker'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Docker');

INSERT INTO referential (id, type, value)
SELECT 14, 'SKILL', 'Kubernetes'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Kubernetes');

INSERT INTO referential (id, type, value)
SELECT 15, 'SKILL', 'AWS'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'AWS');

INSERT INTO referential (id, type, value)
SELECT 16, 'SKILL', 'Azure'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Azure');

INSERT INTO referential (id, type, value)
SELECT 17, 'SKILL', 'Git'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Git');

INSERT INTO referential (id, type, value)
SELECT 18, 'SKILL', 'CSS'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'CSS');

INSERT INTO referential (id, type, value)
SELECT 19, 'SKILL', 'HTML'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'HTML');

INSERT INTO referential (id, type, value)
SELECT 20, 'SKILL', 'JavaScript'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'JavaScript');

INSERT INTO referential (id, type, value)
SELECT 21, 'SKILL', 'TypeScript'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'TypeScript');

INSERT INTO referential (id, type, value)
SELECT 22, 'SKILL', 'React'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'React');

INSERT INTO referential (id, type, value)
SELECT 23, 'SKILL', 'Angular'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Angular');

INSERT INTO referential (id, type, value)
SELECT 24, 'SKILL', 'Next'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Next');

INSERT INTO referential (id, type, value)
SELECT 25, 'SKILL', '.NET'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = '.NET');

INSERT INTO referential (id, type, value)
SELECT 26, 'SKILL', 'Rust'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Rust');

-- Référentiels - FIELDS
INSERT INTO referential (id, type, value)
SELECT 27, 'FIELD', 'Informatique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Informatique');

INSERT INTO referential (id, type, value)
SELECT 28, 'FIELD', 'Finance'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Finance');

INSERT INTO referential (id, type, value)
SELECT 29, 'FIELD', 'Banque'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Banque');

INSERT INTO referential (id, type, value)
SELECT 30, 'FIELD', 'Ressources Humaines'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Ressources Humaines');

INSERT INTO referential (id, type, value)
SELECT 31, 'FIELD', 'Marketing'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Marketing');

INSERT INTO referential (id, type, value)
SELECT 32, 'FIELD', 'Vente'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Vente');

INSERT INTO referential (id, type, value)
SELECT 33, 'FIELD', 'Logistique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Logistique');

INSERT INTO referential (id, type, value)
SELECT 34, 'FIELD', 'Gestion de Projet'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Gestion de Projet');

INSERT INTO referential (id, type, value)
SELECT 35, 'FIELD', 'Éducation'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Éducation');

INSERT INTO referential (id, type, value)
SELECT 36, 'FIELD', 'Santé'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Santé');

INSERT INTO referential (id, type, value)
SELECT 37, 'FIELD', 'Art'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Art');

INSERT INTO referential (id, type, value)
SELECT 38, 'FIELD', 'Juridique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Juridique');

INSERT INTO referential (id, type, value)
SELECT 39, 'FIELD', 'Consulting'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Consulting');

INSERT INTO referential (id, type, value)
SELECT 40, 'FIELD', 'Technologie'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Technologie');

INSERT INTO referential (id, type, value)
SELECT 41, 'FIELD', 'Gestion des Risques'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Gestion des Risques');

INSERT INTO referential (id, type, value)
SELECT 42, 'FIELD', 'Cybersecurity'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Cybersecurity');

INSERT INTO referential (id, type, value)
SELECT 43, 'FIELD', 'Data Science'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Data Science');

INSERT INTO referential (id, type, value)
SELECT 44, 'FIELD', 'Intelligence Artificielle'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Intelligence Artificielle');

INSERT INTO referential (id, type, value)
SELECT 45, 'FIELD', 'Ingénierie'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Ingénierie');

INSERT INTO referential (id, type, value)
SELECT 46, 'FIELD', 'Recherche'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Recherche');
