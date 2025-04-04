
export type UserProfile = {
  id: string;
  username?: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  email?: string; // Joined from auth.users
};
