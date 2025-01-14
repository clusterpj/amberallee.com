export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          description: string | null
          amazon_link: string | null
          cover_image_url: string | null
          published_date: string | null
          price: number | null
          teasers: string[] | null
          tropes: string[] | null
          series: string | null
          series_order: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          amazon_link?: string | null
          cover_image_url?: string | null
          published_date?: string | null
          price?: number | null
          teasers?: string[] | null
          tropes?: string[] | null
          series?: string | null
          series_order?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          amazon_link?: string | null
          cover_image_url?: string | null
          published_date?: string | null
          price?: number | null
          teasers?: string[] | null
          tropes?: string[] | null
          series?: string | null
          series_order?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          end_date: string | null
          location: string | null
          virtual_link: string | null
          is_virtual: boolean
          image_url: string | null
          registration_link: string | null
          time: string | null
          capacity: number | null
          status: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          end_date?: string | null
          location?: string | null
          virtual_link?: string | null
          is_virtual?: boolean
          image_url?: string | null
          registration_link?: string | null
          time?: string | null
          capacity?: number | null
          status?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          end_date?: string | null
          location?: string | null
          virtual_link?: string | null
          is_virtual?: boolean
          image_url?: string | null
          registration_link?: string | null
          time?: string | null
          capacity?: number | null
          status?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'customer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'customer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'customer'
          created_at?: string
          updated_at?: string
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
