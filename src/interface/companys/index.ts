
export interface CompanyData {
    job_id: string;
    name: string;
    job_title: string,
    location: string;
    description: string;
    link: string;
    information: string;
    posted_date: string;
    appled?: boolean;
}

export interface SearchComapnyData { 
    job_id: string, 
    company_id?: string
}