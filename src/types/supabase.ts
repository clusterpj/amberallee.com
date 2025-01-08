export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_image_url: string | null
          amazon_link: string | null
          published_date: string | null
          price: number | null
          created_at: string
          updated_at: string
          categories: string[] | null
          purchase_now_button: string | null
          series: string | null
          series_order: number | null
          teasers: string[] | null
          tropes: string[] | null
          is_published: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_image_url?: string | null
          amazon_link?: string | null
          published_date?: string | null
          price?: number | null
          created_at?: string
          updated_at?: string
          categories?: string[] | null
          purchase_now_button?: string | null
          series?: string | null
          series_order?: number | null
          teasers?: string[] | null
          tropes?: string[] | null
          is_published?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_image_url?: string | null
          amazon_link?: string | null
          published_date?: string | null
          price?: number | null
          created_at?: string
          updated_at?: string
          categories?: string[] | null
          purchase_now_button?: string | null
          series?: string | null
          series_order?: number | null
          teasers?: string[] | null
          tropes?: string[] | null
          is_published?: boolean
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
