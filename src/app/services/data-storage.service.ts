import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(`https://ng-recipe-book-b5dac.firebaseio.com/recipes.json?auth=${token}`, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get(`https://ng-recipe-book-b5dac.firebaseio.com/recipes.json?auth=${token}`)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          recipes.forEach(recipe => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] =[];
            }
          });
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        });
  }

}
