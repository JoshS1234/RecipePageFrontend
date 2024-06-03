export type Ingredient {
    name: string;
    amount: string;
}

export type Recipe {
    id: number;
    title: string[];
    ingredients: Ingredient[];
    recipeSteps: string[];
    author: string;
    rating: number;
    dateCreated: string;
    scores: number[];
    imageUrl: string;
}