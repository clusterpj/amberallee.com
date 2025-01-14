export interface Event {
  id?: string
  title: string
  description?: string
  date: string | Date
  end_date?: string
  location?: string
  virtual_link?: string
  is_virtual: boolean
  image_url?: string
  registration_link?: string
  time?: string
  capacity?: number
  status: string
  tags?: string[]
  created_at?: string
  updated_at?: string
}
