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
      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: string | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: string | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          role?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string | null;
          content: string | null;
          category_id: string | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary?: string | null;
          content?: string | null;
          category_id?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string | null;
          content?: string | null;
          category_id?: string | null;
          featured?: boolean;
          created_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string | null;
        };
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          file_url: string;
          media_type: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          file_url: string;
          media_type?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          file_url?: string;
          media_type?: string;
        };
      };
      project_documents: {
        Row: {
          id: string;
          project_id: string;
          file_url: string;
          title: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          file_url: string;
          title?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          file_url?: string;
          title?: string | null;
        };
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string | null;
          credential_url: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          issue_date?: string | null;
          credential_url?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          issue_date?: string | null;
          credential_url?: string | null;
        };
      };
    };
  };
}