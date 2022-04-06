export type Site = {
  id: number;
  city: string;
  image: string;
  name: string;
  region: string;
  is_stamped: boolean;
};

export type Details = {
  city: string;
  description: string;
  employees: [] | null;
  // [ # Only if employees are assigned
  //   {
  //   "added_by": int,
  //   "can_reward": bool,
  //   "email": str,
  //   "first_name": str,
  //   "last_name": str,
  //   "place_id": int,
  //   "profile_picture": str
  //   }, ...
  // ],
  images: [];
  latitude: string;
  longitude: string;
  name: string;
  region: string;
};
