const API_URL = 'http://localhost:8000/api';

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
    const response = await fetch(`${API_URL}/departments/`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
  },

  // Получение активных опросов
  getSurveys: async () => {
    const response = await fetch(`${API_URL}/surveys/`);
    if (!response.ok) throw new Error('Failed to fetch surveys');
    return response.json();
  },

  // Отправка ответа на опрос
  submitSurveyResponse: async (data: SurveyResponse) => {
    try {
      console.log('Отправляемые данные:', data);
      
      const response = await fetch(`${API_URL}/responses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ответ сервера:', errorData);
        throw new Error(`Server error: ${JSON.stringify(errorData)}`);
      }

      return response.json();
    } catch (error) {
      console.error('Полная ошибка:', error);
      throw error;
    }
  }
}; 