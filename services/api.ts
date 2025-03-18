import env from '@/config/env';

// Base API URL from environment
const API_URL: string = env.API_URL;

// API Response Types
interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

// Resume Types
export interface PersonalDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    portfolio?: string;
    linkedin?: string;
}

export interface ObjectiveSection {
    summary: string;
    yearsOfExperience?: string;
    desiredRoles?: string;
}

export interface EducationSection {
    degree: string;
    university: string;
    graduationYear: string;
    coursework?: string;
}

export interface SkillsSection {
    technical: string;
    soft?: string;
    additional?: string;
}

export interface ExperienceSection {
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    achievements: string;
}

export interface ProjectSection {
    title: string;
    description: string;
    link?: string;
}

export interface ExtraCurricularSection {
    activities?: string;
    socialLinks?: string;
}

export interface LeadershipSection {
    role?: string;
    organization?: string;
    responsibilities?: string;
}

export interface ResumeData {
    personalDetails: PersonalDetails;
    objective: ObjectiveSection;
    education: EducationSection;
    skills: SkillsSection;
    experience: ExperienceSection;
    projects: ProjectSection;
    extraCurricular?: ExtraCurricularSection;
    leadership?: LeadershipSection;
}

export interface Resume extends ResumeData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// Cover Letter Types
export interface CoverLetterData {
    resumeId: string;
    jobTitle: string;
    companyName: string;
    content: string;
    customizations?: string;
}

export interface CoverLetter extends CoverLetterData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Generic API request function
 * @param endpoint - API endpoint
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param data - Request data (for POST, PUT)
 * @param headers - Additional headers
 * @returns Promise with response data
 */
async function apiRequest<T = any>(
    endpoint: string,
    method: string = 'GET',
    data: any = null,
    headers: Record<string, string> = {}
): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();

            if (!response.ok) {
                // Handle API errors
                throw new Error(result.message || 'API Error');
            }

            return result;
        } else {
            // Handle non-JSON responses (like plain text)
            const textResult = await response.text();

            if (!response.ok) {
                throw new Error(textResult || 'API Error');
            }

            return textResult as unknown as T;
        }
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

/**
 * Resume-related API calls
 */
export const ResumeAPI = {
    // Create a new resume
    create: (resumeData: ResumeData): Promise<Resume> => {
        return apiRequest<Resume>('/resume', 'POST', resumeData);
    },

    // Get all resumes for the user
    getAll: (): Promise<Resume[]> => {
        return apiRequest<Resume[]>('/resume');
    },

    // Get a single resume by ID
    getById: (resumeId: string): Promise<Resume> => {
        return apiRequest<Resume>(`/resume/${resumeId}`);
    },

    // Update a resume
    update: (resumeId: string, resumeData: Partial<ResumeData>): Promise<Resume> => {
        return apiRequest<Resume>(`/resume/${resumeId}`, 'PUT', resumeData);
    },

    // Delete a resume
    delete: (resumeId: string): Promise<void> => {
        return apiRequest<void>(`/resume/${resumeId}`, 'DELETE');
    },

    // Generate a resume using AI
    generate: (resumeData: ResumeData): Promise<Resume> => {
        return apiRequest<Resume>('/resume/generate', 'POST', resumeData);
    },
};

/**
 * Cover Letter-related API calls
 */
export const CoverLetterAPI = {
    // Create a new cover letter
    create: (coverLetterData: CoverLetterData): Promise<CoverLetter> => {
        return apiRequest<CoverLetter>('/cover-letter', 'POST', coverLetterData);
    },

    // Get all cover letters for the user
    getAll: (): Promise<CoverLetter[]> => {
        return apiRequest<CoverLetter[]>('/cover-letter');
    },

    // Get a single cover letter by ID
    getById: (coverLetterId: string): Promise<CoverLetter> => {
        return apiRequest<CoverLetter>(`/cover-letter/${coverLetterId}`);
    },

    // Update a cover letter
    update: (coverLetterId: string, coverLetterData: Partial<CoverLetterData>): Promise<CoverLetter> => {
        return apiRequest<CoverLetter>(`/cover-letter/${coverLetterId}`, 'PUT', coverLetterData);
    },

    // Delete a cover letter
    delete: (coverLetterId: string): Promise<void> => {
        return apiRequest<void>(`/cover-letter/${coverLetterId}`, 'DELETE');
    },

    // Generate a cover letter using AI and resume data
    generate: (resumeData: ResumeData, jobDescription: string): Promise<CoverLetter> => {
        return apiRequest<CoverLetter>('/cover-letter/generate', 'POST', { resumeData, jobDescription });
    },
};

// Export default with all APIs
export default {
    resume: ResumeAPI,
    coverLetter: CoverLetterAPI,
};