const API_BASE_URL = 'https://akil-backend.onrender.com';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T|undefined
  errors: any;
  count: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  createdBy: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  orgPrimaryPhone: string;
  orgEmail: string;
  isPaid: boolean;
  average_rating: number;
  total_reviews: number;
}

export const fetchOpportunities = async (): Promise<ApiResponse<Job[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return { 
      success: false, 
      message: 'Failed to fetch opportunities',
      data: [],
      errors: error instanceof Error ? error.message : 'Unknown error',
      count: 0
    };
  }
};

export const fetchOpportunityById = async (id: string): Promise<ApiResponse<Job>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error);
    return { 
      success: false, 
      message: `Failed to fetch opportunity ${id}`,
      data: undefined,
      errors: error instanceof Error ? error.message : `Unknown error fetching opportunity ${id}`,
      count: 0
    };
  }
};
