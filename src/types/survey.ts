export interface DocumentTypes {
  templates: number;
  regulations: number;
  faq: number;
  training: number;
  reference: number;
  contacts: number;
}

export interface UsabilityRatings {
  search: number;
  navigation: number;
  organization: number;
}

export interface SurveyFormData {
  department: string;
  frequency: string;
  documentTypes: DocumentTypes;
  usability: UsabilityRatings;
  integration: string;
  feedback: string;
}