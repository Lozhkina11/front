export type Photo = {
  id: number;
  url: string;
  title: string;
  description: string;
};

export type NewPhoto = Omit<Photo, "id">;
