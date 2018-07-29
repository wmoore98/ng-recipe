import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe (
      'Test Recipe',
      'This is a test',
      'https://c.pxhere.com/photos/50/03/beirut_power_supply_snack-1375814.jpg!d',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe (
      'Test Recipe 2',
      'This is a test recipe 2',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Indian-Salsa-dip-mother%27s-recipe.jpg/800px-Indian-Salsa-dip-mother%27s-recipe.jpg',
      [
        new Ingredient('Bun', 1),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // return a clone of the recipes array and not a reference to the original
    // PROBLEM WITH REFERENCES WITHIN ARRAY
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
