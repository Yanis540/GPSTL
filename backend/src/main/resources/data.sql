-- Entreprises
INSERT INTO company (name, siret)
SELECT 'Entreprise Alpha', '12345678901234'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '12345678901234');

INSERT INTO company (name, siret)
SELECT 'Entreprise Beta', '23456789012345'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '23456789012345');

INSERT INTO company (name, siret)
SELECT 'Entreprise Gamma', '34567890123456'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '34567890123456');

INSERT INTO company (name, siret)
SELECT 'Entreprise Delta', '45678901234567'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '45678901234567');

INSERT INTO company (name, siret)
SELECT 'Entreprise Epsilon', '56789012345678'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '56789012345678');

INSERT INTO company (name, siret)
SELECT 'Entreprise Zeta', '67890123456789'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '67890123456789');

INSERT INTO company (name, siret)
SELECT 'Entreprise Eta', '78901234567890'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '78901234567890');

INSERT INTO company (name, siret)
SELECT 'Entreprise Theta', '89012345678901'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '89012345678901');

INSERT INTO company (name, siret)
SELECT 'Entreprise Iota', '90123456789012'
WHERE NOT EXISTS (SELECT 1 FROM company WHERE siret = '90123456789012');


-- Référentiels - GRADES
INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+1'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+1');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+2'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+2');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+3'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+3');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+4'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+4');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+5'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+5');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+6'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+6');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+7'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+7');

INSERT INTO referential (type, value)
SELECT 'GRADE', 'Bac+8'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'GRADE' AND value = 'Bac+8');

-- Référentiels - SKILLS
INSERT INTO referential (type, value)
SELECT 'SKILL', 'Java'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Java');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Spring Boot'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Spring Boot');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'SQL'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'SQL');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Python'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Python');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Docker'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Docker');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Kubernetes'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Kubernetes');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'AWS'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'AWS');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Azure'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Azure');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Git'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Git');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'CSS'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'CSS');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'HTML'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'HTML');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'JavaScript'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'JavaScript');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'TypeScript'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'TypeScript');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'React'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'React');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Angular'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Angular');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Next'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Next');

INSERT INTO referential (type, value)
SELECT 'SKILL', '.NET'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = '.NET');

INSERT INTO referential (type, value)
SELECT 'SKILL', 'Rust'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'SKILL' AND value = 'Rust');

-- Référentiels - FIELDS
INSERT INTO referential (type, value)
SELECT 'FIELD', 'Informatique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Informatique');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Finance'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Finance');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Banque'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Banque');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Ressources Humaines'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Ressources Humaines');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Marketing'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Marketing');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Vente'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Vente');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Logistique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Logistique');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Gestion de Projet'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Gestion de Projet');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Éducation'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Éducation');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Santé'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Santé');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Art'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Art');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Juridique'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Juridique');

INSERT INTO referential (type, value)
SELECT 'FIELD', 'Consulting'
WHERE NOT EXISTS (SELECT 1 FROM referential WHERE type = 'FIELD' AND value = 'Consulting');

---Recruiters

INSERT INTO _user (
    monthly_current_candidacy,
    birth_date,
    company_id,
    field_id,
    grade_id,
    user_type,
    email,
    first_name,
    last_name,
    password,
    role,
    school_name,
    photo
)
SELECT
    NULL,  -- Assuming monthly_current_candidacy can be NULL
    '1985-07-16 00:00:00',  -- Example birth_date
    5,  -- Example company_id
    NULL,  -- Example field_id
    NULL,  -- Example grade_id
    'Recruiter',  -- user_type as requested
    'recruiter@example.com',  -- Example email
    'John',  -- First name
    'Doe',  -- Last name
    'password',  -- Example password
    'RECRUITER',  -- Role
    NULL,  -- school_name can be NULL
    'https://companieslogo.com/img/orig/CAP.PA-9b4110b0.png?t=1720244491'  -- photo can be NULL
WHERE NOT EXISTS (
    SELECT 1
    FROM _user
    WHERE email = 'recruiter@example.com'
);

INSERT INTO _user (
    monthly_current_candidacy,
    birth_date,
    company_id,
    field_id,
    grade_id,
    user_type,
    email,
    first_name,
    last_name,
    password,
    role,
    school_name,
    photo
)
SELECT
    NULL,  -- Assuming monthly_current_candidacy can be NULL
    '1985-07-16 00:00:00',  -- Example birth_date
    6,  -- Example company_id
    NULL,  -- Example field_id
    NULL,  -- Example grade_id
    'Recruiter',  -- user_type as requested
    'recruiter2@example.com',  -- Example email
    'John',  -- First name
    'Doe',  -- Last name
    'password',  -- Example password
    'RECRUITER',  -- Role
    NULL,  -- school_name can be NULL
    'https://logo-marque.com/wp-content/uploads/2021/03/Societe-Generale-Logo.png'  -- photo can be NULL
WHERE NOT EXISTS (
    SELECT 1
    FROM _user
    WHERE email = 'recruiter2@example.com'
);

-- Insert first student

INSERT INTO _user (
    monthly_current_candidacy,
    birth_date,
    company_id,
    field_id,
    grade_id,
    user_type,
    email,
    first_name,
    last_name,
    password,
    role,
    school_name,
    photo
)
SELECT
    5,  -- Example monthly_current_candidacy
    '2000-05-10 00:00:00',  -- Example birth_date
    NULL,  -- No company_id for students
    36,  -- Example field_id (referencing referential table, e.g., for "Engineering")
    5,  -- Example grade_id (referencing referential table, e.g., "Bachelor's")
    'Student',  -- user_type as 'STUDENT'
    'student1@example.com',  -- Unique email
    'Alice',  -- First name
    'Smith',  -- Last name
    'password',  -- Example password (hashed for security)
    'STUDENT',  -- Role as 'STUDENT'
    'Sorbonne Université',  -- Example school_name
    NULL  -- No photo provided
WHERE NOT EXISTS (
    SELECT 1
    FROM _user
    WHERE email = 'student1@example.com'
);

-- Insert second student
INSERT INTO _user (
    monthly_current_candidacy,
    birth_date,
    company_id,
    field_id,
    grade_id,
    user_type,
    email,
    first_name,
    last_name,
    password,
    role,
    school_name,
    photo
)
SELECT
    3,  -- Example monthly_current_candidacy
    '2001-11-20 00:00:00',  -- Example birth_date
    NULL,  -- No company_id for students
    36,  -- Example field_id (referencing referential table, e.g., for "Mathematics")
    5,  -- Example grade_id (referencing referential table, e.g., "Master's")
    'Student',  -- user_type as 'STUDENT'
    'student2@example.com',  -- Unique email
    'Bob',  -- First name
    'Johnson',  -- Last name
    'password',  -- Example password (hashed for security)
    'STUDENT',  -- Role as 'STUDENT'
    'Paris Cité Université',  -- Example school_name
    NULL  -- No photo provided
WHERE NOT EXISTS (
    SELECT 1
    FROM _user
    WHERE email = 'student2@example.com'
);

-- Associate skills for the first student (Alice Smith, user_id = 1001)
INSERT INTO ass_user_skill (skill_id, user_id)
SELECT
    9,  -- Example skill_id (e.g., "Python" from the referential table)
    4  -- Alice Smith's user_id
WHERE NOT EXISTS (
    SELECT 1
    FROM ass_user_skill
    WHERE skill_id = 9
      AND user_id = 4
);

INSERT INTO ass_user_skill (skill_id, user_id)
SELECT
    10,  -- Example skill_id (e.g., "Machine Learning" from the referential table)
    4  -- Alice Smith's user_id
WHERE NOT EXISTS (
    SELECT 1
    FROM ass_user_skill
    WHERE skill_id = 10
      AND user_id = 4
);

INSERT INTO ass_user_skill (skill_id, user_id)
SELECT
    9,
    3
WHERE NOT EXISTS (
    SELECT 1
    FROM ass_user_skill
    WHERE skill_id = 9
      AND user_id = 3
);

INSERT INTO ass_user_skill (skill_id, user_id)
SELECT
    10,
    3
WHERE NOT EXISTS (
    SELECT 1
    FROM ass_user_skill
    WHERE skill_id = 10
      AND user_id = 3
);

-- Insert first offer
INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    60000.00,  -- Salary
    '2024-10-17 09:00:00',  -- Publication date
    1,  -- recruiter_id (foreign key, assuming recruiter with id = 1 exists)
    'Develop software solutions for fintech',  -- Description
    'Software Engineer',  -- Job name
    'Full-time'  -- Rhythm (e.g., full-time)
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Software Engineer'
);

-- Insert second offer
INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    45000.00,  -- Salary
    '2024-10-17 09:00:00',  -- Publication date
    1,  -- recruiter_id (assuming recruiter with id = 2 exists)
    'Manage digital marketing campaigns for clients',  -- Description
    'Marketing Manager',  -- Job name
    'Part-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Marketing Manager'
);

-- Insert third offer
INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    75000.00,  -- Salary
    '2024-10-17 09:00:00',  -- Publication date
    2,  -- recruiter_id (assuming recruiter with id = 1 exists)
    'Lead data analytics initiatives',  -- Description
    'Data Scientist',  -- Job name
    'Full-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Data Scientist'
);

-- Insert fourth offer
INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    55000.00,  -- Salary
    '2024-10-17 09:00:00',  -- Publication date
    2,  -- recruiter_id (assuming recruiter with id = 3 exists)
    'Oversee customer success team',  -- Description
    'Customer Success Manager',  -- Job name
    'Full-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Customer Success Manager'
);

INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    60000.00,  -- Salary
    '2024-10-17 09:00:00',  -- Publication date
    2,  -- recruiter_id
    'Lead the development team',  -- Description
    'Technical Lead',  -- Job name
    'Full-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Technical Lead'
);

INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    45000.00,  -- Salary
    '2024-10-18 10:00:00',  -- Publication date
    2,  -- recruiter_id
    'Manage social media campaigns',  -- Description
    'Social Media Manager',  -- Job name
    'Part-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Social Media Manager'
);

INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    75000.00,  -- Salary
    '2024-10-19 11:00:00',  -- Publication date
    2,  -- recruiter_id
    'Develop marketing strategies',  -- Description
    'Marketing Director',  -- Job name
    'Full-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Marketing Director'
);

INSERT INTO offer (
    salary,
    publication_date,
    recruiter_id,
    description,
    name,
    rhythm
)
SELECT
    52000.00,  -- Salary
    '2024-10-20 12:00:00',  -- Publication date
    2,  -- recruiter_id
    'Conduct data analysis and reporting',  -- Description
    'Data Analyst',  -- Job name
    'Full-time'  -- Rhythm
WHERE NOT EXISTS (
    SELECT 1
    FROM offer
    WHERE name = 'Data Analyst'
);


-- Insert first candidacy (Student Alice Smith applies to the Software Engineer offer)
INSERT INTO candidacy (
    date_of_candidacy,
    date_of_response,
    offer_id,
    student_id,
    status
)
SELECT
    '2024-10-17 10:00:00',  -- Date of candidacy
    NULL,  -- No response yet
    1,  -- Offer ID for 'Software Engineer' (offer_id = 1)
    3,  -- Alice Smith's student_id (student_id = 3)
    'REFUSED'  -- Status of the candidacy
WHERE NOT EXISTS (
    SELECT 1
    FROM candidacy
    WHERE offer_id = 1 AND student_id = 3
);

-- Insert second candidacy (Student Bob Johnson applies to the Marketing Manager offer)
INSERT INTO candidacy (
    date_of_candidacy,
    date_of_response,
    offer_id,
    student_id,
    status
)
SELECT
    '2024-10-17 11:00:00',  -- Date of candidacy
    NULL,  -- No response yet
    2,  -- Offer ID for 'Marketing Manager' (offer_id = 2)
    4,  -- Bob Johnson's student_id (student_id = 4)
    'PENDING'  -- Status of the candidacy
WHERE NOT EXISTS (
    SELECT 1
    FROM candidacy
    WHERE offer_id = 2 AND student_id = 4
);

-- Insert third candidacy (Alice Smith applies to the Data Scientist offer)
INSERT INTO candidacy (
    date_of_candidacy,
    date_of_response,
    offer_id,
    student_id,
    status
)
SELECT
    '2024-10-18 09:30:00',  -- Date of candidacy
    '2024-10-19 14:00:00',  -- Response date
    3,  -- Offer ID for 'Data Scientist' (offer_id = 3)
    3,  -- Alice Smith's student_id (student_id = 3)
    'ACCEPTED'  -- Status of the candidacy
WHERE NOT EXISTS (
    SELECT 1
    FROM candidacy
    WHERE offer_id = 3 AND student_id = 3
);

-- Insert fourth candidacy (Bob Johnson applies to the Customer Success Manager offer)
INSERT INTO candidacy (
    date_of_candidacy,
    date_of_response,
    offer_id,
    student_id,
    status
)
SELECT
    '2024-10-18 09:45:00',  -- Date of candidacy
    NULL,  -- No response yet
    4,  -- Offer ID for 'Customer Success Manager' (offer_id = 4)
    4,  -- Bob Johnson's student_id (student_id = 4)
    'PENDING'  -- Status of the candidacy
WHERE NOT EXISTS (
    SELECT 1
    FROM candidacy
    WHERE offer_id = 4 AND student_id = 4
);

SELECT setval(pg_get_serial_sequence('company', 'id'), (SELECT MAX(id) FROM company));
SELECT setval(pg_get_serial_sequence('referential', 'id'), (SELECT MAX(id) FROM referential));
SELECT setval(pg_get_serial_sequence('_user', 'id'), (SELECT MAX(id) FROM _user));
SELECT setval(pg_get_serial_sequence('offer', 'id'), (SELECT MAX(id) FROM offer));
SELECT setval(pg_get_serial_sequence('candidacy', 'id'), (SELECT MAX(id) FROM candidacy));
SELECT setval(pg_get_serial_sequence('refresh_token', 'id'), (SELECT MAX(id) FROM refresh_token));




