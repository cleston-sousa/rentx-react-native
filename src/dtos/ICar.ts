export interface ICar {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
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
