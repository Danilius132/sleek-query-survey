export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      surveys: {
        Row: {
          id: string
          title: string
          description: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      survey_responses: {
        Row: {
          id: string
          survey_id: string
          department: string
          frequency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          survey_id: string
          department: string
          frequency: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          survey_id?: string
          department?: string
          frequency?: string
          created_at?: string
          updated_at?: string
        }
      }
      document_ratings: {
        Row: {
          id: string
          response_id: string
          document_type: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          response_id: string
          document_type: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          response_id?: string
          document_type?: string
          rating?: number
          created_at?: string
        }
      }
      usability_ratings: {
        Row: {
          id: string
          response_id: string
          feature_type: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          response_id: string
          feature_type: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          response_id?: string
          feature_type?: string
          rating?: number
          created_at?: string
        }
      }
      integration_preferences: {
        Row: {
          id: string
          response_id: string
          preference: string
          created_at: string
        }
        Insert: {
          id?: string
          response_id: string
          preference: string
          created_at?: string
        }
        Update: {
          id?: string
          response_id?: string
          preference?: string
          created_at?: string
        }
      }
      feedback_responses: {
        Row: {
          id: string
          response_id: string
          feedback: string
          created_at: string
        }
        Insert: {
          id?: string
          response_id: string
          feedback: string
          created_at?: string
        }
        Update: {
          id?: string
          response_id?: string
          feedback?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
