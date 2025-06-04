export type Database = {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          offering_category: string
          offering_description: string
          seeking_category: string
          seeking_description: string
          location: string
          image_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          user_id: string
          title: string
          description: string
          offering_category: string
          offering_description: string
          seeking_category: string
          seeking_description: string
          location: string
          image_url: string | null
          status: string
          created_at: string
        }
        Update: {
          user_id: string
          title: string
          description: string
          offering_category: string
          offering_description: string
          seeking_category: string
          seeking_description: string
          location: string
          image_url: string | null
          status: string
          created_at: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
        }
        Update: {
          id: string
          full_name: string
          email: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          other_user_id: string
          other_user_name: string
          last_message: string
          last_message_time: string
          unread_count: number
          listing_id: string
          listing_title: string
        }
        Insert: {
          user_id: string
          other_user_id: string
          other_user_name: string
          last_message: string
          last_message_time: string
          unread_count: number
          listing_id: string
          listing_title: string
        }
        Update: {
          user_id: string
          other_user_id: string
          other_user_name: string
          last_message: string
          last_message_time: string
          unread_count: number
          listing_id: string
          listing_title: string
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
