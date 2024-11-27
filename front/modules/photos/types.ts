export type Photo = {
  id: number;
  url?: string;
  file?: string;
  title: string;
  description: string;
};

export type NewPhoto = Omit<Photo, "id">;
