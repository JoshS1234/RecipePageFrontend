export type Ingredient = {
  name: string;
  amount: string;
};

export type Recipe = {
  id: number;
  title: string;
  author: string;
  rating: number;
  dateCreated: string;
  image_url: string;
  upvotes: number;
  downvotes: number;
  ingredients: Ingredient[];
  recipe_steps: string[];
};
