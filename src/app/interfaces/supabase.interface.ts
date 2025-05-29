export interface DatabaseReview {
  content: string;
  rating: number;
  user_id: { name?: string } | null;
  car_id: { brand?: string; model?: string } | null;
}

export interface FormattedReview {
  img: string;
  alt: string;
  message: string;
  name: string;
  stars: number;
  car: string;
}
