// Mock data for development
const mockDepartments = [
  { id: 1, name: "Юридический отдел" },
  { id: 2, name: "Отдел продаж" },
  { id: 3, name: "Руководство" }
];

const mockSurveys = [
  { id: 1, name: "Опрос по базе знаний", active: true }
];

// Mock survey responses data
const mockAnalytics = {
  "Юридический отдел": {
    frequency: { "several-times-day": 5, "daily": 3, "several-times-week": 2 },
    documentTypes: {
      templates: 4.5,
      regulations: 4.8,
      faq: 3.9,
      training: 4.2,
      reference: 4.0,
      contacts: 3.7
    },
    usability: {
      search: 4.3,
      navigation: 4.1,
      organization: 4.4
    },
    integration: { "full": 6, "partial": 2, "minimal": 1, "none": 1 }
  },
  "Отдел продаж": {
    frequency: { "several-times-day": 8, "daily": 4, "several-times-week": 1 },
    documentTypes: {
      templates: 4.2,
      regulations: 3.9,
      faq: 4.5,
      training: 4.3,
      reference: 3.8,
      contacts: 4.6
    },
    usability: {
      search: 4.5,
      navigation: 4.2,
      organization: 4.0
    },
    integration: { "full": 8, "partial": 3, "minimal": 1, "none": 1 }
  },
  "Руководство": {
    frequency: { "several-times-day": 3, "daily": 5, "several-times-week": 4 },
    documentTypes: {
      templates: 4.7,
      regulations: 4.9,
      faq: 3.8,
      training: 4.1,
      reference: 4.4,
      contacts: 4.0
    },
    usability: {
      search: 4.6,
      navigation: 4.4,
      organization: 4.5
    },
    integration: { "full": 4, "partial": 5, "minimal": 2, "none": 1 }
  }
};

export interface SurveyResponse {
  survey: number;
  department: number;
  binary_choice: boolean;
  doc_type_1_rating: number;
  doc_type_2_rating: number;
  doc_type_3_rating: number;
  doc_type_4_rating: number;
  doc_type_5_rating: number;
  doc_type_6_rating: number;
  usability_feature_1: number;
  usability_feature_2: number;
  usability_feature_3: number;
  integration_preference: string;
  feedback: string;
}

export const api = {
  getDepartments: async () => {
    return { results: mockDepartments };
  },

  getSurveys: async () => {
    return { results: mockSurveys };
  },

  getAnalytics: async () => {
    return { results: mockAnalytics };
  },

  submitSurveyResponse: async (data: SurveyResponse) => {
    console.log('Отправляемые данные:', data);
    return { success: true };
  }
};