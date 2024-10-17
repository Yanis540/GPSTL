


declare global {
    // put global files
    
    type User = {
        id : number 
        monthlyCurrentCandidacy?: number; // integer, optional
        birthDate: string; // timestamp(6), represented as ISO string
        userType: string; // varchar(31)
        email?: string; // varchar(255), optional
        firstName?: string; // varchar(255), optional
        lastName?: string; // varchar(255), optional
        password: string; // varchar(255)
        role: UserRole; // varchar(255) with enum values
        photo?: string; // oid (PostgreSQL object identifier)
        tokens  ?: AuthCredentials
    }
    
    interface Student extends User  {
        schoolName : string; // varchar(255), optional
        gradeId: number; // bigint, optional
        fieldId: number; // bigint, optional
    }
    interface Recruiter extends User  {
        company: Company; // bigint, optional

    }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Admin extends User  {
    }
    type Company ={
        id : number
    }
    type AuthCredentials = {
        access: {
            exp ?: number 
            token : string 
        }
        refresh : {
            token : string 
        }
    }
    type ErrorResponse = {
        cause : string 
        message : string 
    }
    type Company ={
        id: number; // bigint in PostgreSQL corresponds to number in TypeScript
        name: string; // varchar(255) corresponds to string
        siret: string; // varchar(255) corresponds to string
    }
    // Referential table
    type Referential =  {
        id: number; // bigint
        type: 'GRADE' | 'SKILL' | 'FIELD'; // varchar(255) with enum values
        value: string; // varchar(255)
    }
    // Candidacy table
    interface Candidacy {
        id: number; // bigint
        dateOfCandidacy: string; // timestamp(6), represented as ISO string
        dateOfResponse?: string; // timestamp(6), optional
        offerId?: number; // bigint, optional
        studentId?: number; // bigint, optional
        status: CandidacyStatus // varchar(255) with enum values
    }
    // Refresh_Token table
    interface RefreshToken {
        id: number; // integer
        revoked: boolean; // boolean
        expiryDate: string; // timestamp(6) with time zone, represented as ISO string
        userId?: number; // bigint, optional
        token?: string; // varchar(255), optional
    }
    
}
export {}