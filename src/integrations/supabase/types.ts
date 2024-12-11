export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      document_ratings: {
        Row: {
          created_at: string
          document_type: string
          id: string
          rating: number
          response_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          id?: string
          rating: number
          response_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          id?: string
          rating?: number
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_ratings_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          id: string
          name: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      feedback_responses: {
        Row: {
          created_at: string
          feedback: string
          id: string
          response_id: string
        }
        Insert: {
          created_at?: string
          feedback: string
          id?: string
          response_id: string
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: string
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_responses_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_preferences: {
        Row: {
          created_at: string
          id: string
          preference: string
          response_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preference: string
          response_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preference?: string
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_preferences_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          actual: number
          actual_values: number[] | null
          created_at: string
          employee_id: string
          id: string
          label: string
          plan: number
          unit: string
          updated_at: string
        }
        Insert: {
          actual: number
          actual_values?: number[] | null
          created_at?: string
          employee_id: string
          id?: string
          label: string
          plan: number
          unit?: string
          updated_at?: string
        }
        Update: {
          actual?: number
          actual_values?: number[] | null
          created_at?: string
          employee_id?: string
          id?: string
          label?: string
          plan?: number
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "metrics_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_structure: {
        Row: {
          created_at: string
          existing_contracts: number
          id: string
          new_customers: number
          renewed_contracts: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          existing_contracts: number
          id?: string
          new_customers: number
          renewed_contracts: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          existing_contracts?: number
          id?: string
          new_customers?: number
          renewed_contracts?: number
          updated_at?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          created_at: string
          department: string
          frequency: string
          id: string
          survey_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          frequency: string
          id?: string
          survey_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          frequency?: string
          id?: string
          survey_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      transcription_jobs: {
        Row: {
          corrected_transcription: string | null
          created_at: string
          file_size: number | null
          final_subtitles: Json | null
          id: string
          original_filename: string
          processed_chunks: number | null
          russian_translation: string | null
          srt_file_path: string | null
          status: string
          storage_path: string
          total_chunks: number | null
          updated_at: string
          user_id: string | null
          whisper_response: Json | null
        }
        Insert: {
          corrected_transcription?: string | null
          created_at?: string
          file_size?: number | null
          final_subtitles?: Json | null
          id?: string
          original_filename: string
          processed_chunks?: number | null
          russian_translation?: string | null
          srt_file_path?: string | null
          status?: string
          storage_path: string
          total_chunks?: number | null
          updated_at?: string
          user_id?: string | null
          whisper_response?: Json | null
        }
        Update: {
          corrected_transcription?: string | null
          created_at?: string
          file_size?: number | null
          final_subtitles?: Json | null
          id?: string
          original_filename?: string
          processed_chunks?: number | null
          russian_translation?: string | null
          srt_file_path?: string | null
          status?: string
          storage_path?: string
          total_chunks?: number | null
          updated_at?: string
          user_id?: string | null
          whisper_response?: Json | null
        }
        Relationships: []
      }
      usability_ratings: {
        Row: {
          created_at: string
          feature_type: string
          id: string
          rating: number
          response_id: string
        }
        Insert: {
          created_at?: string
          feature_type: string
          id?: string
          rating: number
          response_id: string
        }
        Update: {
          created_at?: string
          feature_type?: string
          id?: string
          rating?: number
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usability_ratings_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clear_survey_responses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
