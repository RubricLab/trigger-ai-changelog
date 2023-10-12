export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      changelogs: {
        Row: {
          created_at: string;
          end_date: string;
          id: number;
          markdown: string | null;
          repo: number;
          start_date: string;
        };
        Insert: {
          created_at?: string;
          end_date: string;
          id?: number;
          markdown?: string | null;
          repo: number;
          start_date: string;
        };
        Update: {
          created_at?: string;
          end_date?: string;
          id?: number;
          markdown?: string | null;
          repo?: number;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "changelogs_repo_fkey";
            columns: ["repo"];
            referencedRelation: "repos";
            referencedColumns: ["id"];
          }
        ];
      };
      repos: {
        Row: {
          created_at: string | null;
          id: number;
          owner: string;
          repo: string;
          repo_url: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          owner: string;
          repo: string;
          repo_url: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          owner?: string;
          repo?: string;
          repo_url?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
