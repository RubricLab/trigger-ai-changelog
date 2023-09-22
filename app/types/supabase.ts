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
          repo: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          markdown?: string | null
          repo: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          markdown?: string | null
          repo?: number
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
          name: string
          owner: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          owner: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          owner?: string
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
