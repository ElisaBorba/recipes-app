export type DrinksType = {
  name: string
};
export type MealsType = {
  name: string
};
export type UserContextType = {
  loading:boolean
};

export type RecipesType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  tags?: string[];
  doneDate?: string;
};
