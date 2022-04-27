export type Site = {
  id: number;
  city: string;
  image: string;
  name: string;
  region: string;
  is_stamped: boolean;
};

export type SiteEmployeeDetails = {
  added_by: number;
  can_reward: boolean;
  email: string;
  first_name: string;
  last_name: string;
  place_id: number;
  profile_picture: string;
};

export type SiteDetails = {
  city: string;
  description: string;
  // Only if employees are assigned or else null
  employees: SiteEmployeeDetails[] | null;
  images: [];
  latitude: string;
  longitude: string;
  name: string;
  region: string;
};
