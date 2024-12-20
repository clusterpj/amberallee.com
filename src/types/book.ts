export interface Book {
  id: string
  title: string
  description: string
  amazonLink: string
  publishedDate: string
  coverImage: string
  price: number
  isPublished?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface BookDB {
  id: string
  title: string
  description: string
  amazon_link: string
  published_date: string
  cover_image_url: string
  price: number
  is_published?: boolean
  created_at?: string
  updated_at?: string
}
