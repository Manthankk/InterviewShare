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
      submissions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          country: string
          company: string
          questions: string[]
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          country: string
          company: string
          questions: string[]
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          country?: string
          company?: string
          questions?: string[]
          user_id?: string
        }
      }
    }
  }
}