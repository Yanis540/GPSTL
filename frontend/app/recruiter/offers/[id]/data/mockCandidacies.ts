export interface Candidacy {
    id: number;
    studentName: string;
    status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
    dateOfCandidacy: string;
    dateOfResponse: string | null;
    studentPhoto: string;
    profileDetails: ProfileDetails;
}

export interface ProfileDetails {
    age: number;
    grade: string;
    email: string;
    phone: string;
    address: string;
    skills: string[];
    experience: string;
    education: string;
    linkedin: string;
    photo: string;
}

// Export the mock data
export const mockCandidacies: Candidacy[] = [
    {
        id: 1,
        studentName: 'Alice Martin',
        status: 'PENDING',
        dateOfCandidacy: '2024-01-15',
        dateOfResponse: null,
        studentPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
        profileDetails: {
            age: 23,
            grade: 'Master\'s in Computer Science',
            email: 'alice.martin@example.com',
            phone: '+33 6 12 34 56 78',
            address: '123 Rue de Paris, 75001 Paris, France',
            skills: ['Java', 'Spring Boot', 'SQL', 'AWS'],
            experience: '2 years of full-stack development experience at a fintech startup.',
            education: "Master's in Computer Science, Sorbonne University, 2023",
            linkedin: 'https://linkedin.com/in/alicemartin',
            photo: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
    },
    {
        id: 2,
        studentName: 'John Doe',
        status: 'ACCEPTED',
        dateOfCandidacy: '2024-01-10',
        dateOfResponse: '2024-01-20',
        studentPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
        profileDetails: {
            age: 25,
            grade: 'Bachelor\'s in Software Engineering',
            email: 'john.doe@example.com',
            phone: '+44 7 987 654 321',
            address: '456 Oxford Street, London, UK',
            skills: ['Python', 'Docker', 'Kubernetes', 'Linux'],
            experience: '1 year as a DevOps Engineer at a cloud computing company.',
            education: "Bachelor's in Software Engineering, University of London, 2022",
            linkedin: 'https://linkedin.com/in/johndoe',
            photo: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
    },
    {
        id: 3,
        studentName: 'Sophia Lee',
        status: 'REFUSED',
        dateOfCandidacy: '2024-02-01',
        dateOfResponse: '2024-02-10',
        studentPhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
        profileDetails: {
            age: 27,
            grade: 'PhD in Artificial Intelligence',
            email: 'sophia.lee@example.com',
            phone: '+44 20 7946 0958',
            address: '789 King\'s Road, London, UK',
            skills: ['Python', 'TensorFlow', 'Machine Learning', 'NLP'],
            experience: '4 years of AI research and development at a leading AI lab.',
            education: 'PhD in Artificial Intelligence, University of Cambridge, 2021',
            linkedin: 'https://linkedin.com/in/sophialee',
            photo: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
    },
    {
        id: 4,
        studentName: 'Michael Johnson',
        status: 'PENDING',
        dateOfCandidacy: '2024-02-05',
        dateOfResponse: null,
        studentPhoto: 'https://randomuser.me/api/portraits/men/4.jpg',
        profileDetails: {
            age: 30,
            grade: 'Master\'s in Data Science',
            email: 'michael.johnson@example.com',
            phone: '+1 555 789 1234',
            address: '123 5th Avenue, New York, USA',
            skills: ['R', 'Python', 'Data Visualization', 'Big Data'],
            experience: '5 years as a Data Scientist at a multinational financial services firm.',
            education: "Master's in Data Science, NYU, 2020",
            linkedin: 'https://linkedin.com/in/michaeljohnson',
            photo: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
    },
    {
        id: 5,
        studentName: 'Emily Brown',
        status: 'ACCEPTED',
        dateOfCandidacy: '2024-01-20',
        dateOfResponse: '2024-01-25',
        studentPhoto: 'https://randomuser.me/api/portraits/women/5.jpg',
        profileDetails: {
            age: 24,
            grade: 'Bachelor\'s in Information Systems',
            email: 'emily.brown@example.com',
            phone: '+1 555 567 8901',
            address: '200 Sunset Blvd, Los Angeles, USA',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            experience: '2 years as a Full Stack Developer at a SaaS startup.',
            education: "Bachelor's in Information Systems, UCLA, 2022",
            linkedin: 'https://linkedin.com/in/emilybrown',
            photo: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
    },
    {
        id: 6,
        studentName: 'David Chen',
        status: 'PENDING',
        dateOfCandidacy: '2024-02-03',
        dateOfResponse: null,
        studentPhoto: 'https://randomuser.me/api/portraits/men/6.jpg',
        profileDetails: {
            age: 22,
            grade: 'Bachelor\'s in Computer Science',
            email: 'david.chen@example.com',
            phone: '+44 20 1234 5678',
            address: '456 High Street, Oxford, UK',
            skills: ['Java', 'C++', 'Spring', 'Microservices'],
            experience: 'Internship at a leading software firm working on backend development.',
            education: "Bachelor's in Computer Science, University of Oxford, 2023",
            linkedin: 'https://linkedin.com/in/davidchen',
            photo: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
    },
    {
        id: 7,
        studentName: 'Laura Green',
        status: 'REFUSED',
        dateOfCandidacy: '2024-02-02',
        dateOfResponse: '2024-02-15',
        studentPhoto: 'https://randomuser.me/api/portraits/women/7.jpg',
        profileDetails: {
            age: 26,
            grade: 'Master\'s in Cybersecurity',
            email: 'laura.green@example.com',
            phone: '+1 555 234 5678',
            address: '789 Elm Street, Boston, USA',
            skills: ['Penetration Testing', 'Cryptography', 'Network Security', 'Firewalls'],
            experience: '3 years as a Cybersecurity Analyst at a financial institution.',
            education: "Master's in Cybersecurity, MIT, 2021",
            linkedin: 'https://linkedin.com/in/lauragreen',
            photo: 'https://randomuser.me/api/portraits/women/7.jpg',
        },
    },
];

