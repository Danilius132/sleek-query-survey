// Mock data for development
const mockDepartments = [
  { id: 1, name: "IT отдел" },
  { id: 2, name: "Отдел продаж" },
  { id: 3, name: "Бухгалтерия" },
  { id: 4, name: "HR отдел" }
];

const mockSurveys = [
  { id: 1, name: "Опрос по базе знаний", active: true }
];

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
  // Получение списка отделов
  getDepartments: async () => {
    return { results: mockDepartments };
  },

  // Получение активных опросов
  getSurveys: async () => {
    return { results: mockSurveys };
  },

  // Отправка ответа на опрос
  submitSurveyResponse: async (data: SurveyResponse) => {
    console.log('Отправляемые данные:', data);
    return { success: true };
  }
};