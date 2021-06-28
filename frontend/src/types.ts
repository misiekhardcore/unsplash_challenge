export interface Photo {
  id: number;
  label: string;
  url: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  photos: Photo[];
  password: string;
}
