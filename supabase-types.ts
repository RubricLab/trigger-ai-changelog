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
      changelogs: {
        Row: {
          created_at: string | null
          date: string
          id: number
          markdown: string | null
          repo: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          markdown?: string | null
          repo?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          markdown?: string | null
          repo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "changelogs_repo_fkey"
            columns: ["repo"]
            referencedRelation: "repos"
            referencedColumns: ["id"]
          }
        ]
      }
      repos: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          owner: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          owner?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          owner?: string | null
        }
        Relationships: []
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
