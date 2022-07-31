export interface ICar {
  // model atts
  id: string;
  name: string;
  brand: string;
  about: string;
  fuel_type: string;
  period: string;
  price: number;
  thumbnail: string;

  // old api atts
  created_at: string;
  updated_at: string;
  accessories: {
    id: string;
    car_id: string;
    type: string;
    name: string;
  }[];
  photos: {
    id: string;
    car_id: string;
    photo: string;
  }[];
}
