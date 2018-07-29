import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') listForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editItem = this.shoppingListService.getIngredient(index);
          this.listForm.setValue(this.editItem);
          this.editMode = true;
    });
  }

  // onAdd(nameInput, amountInput) {
  //   const ingredient = new Ingredient(nameInput.value, amountInput.value);
  //   this.shoppingListService.addIngredient(ingredient);
  // }
  onSubmit() {
    const ingredient = new Ingredient(this.listForm.value.name, this.listForm.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.resetForm();

  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.resetForm();
  }

  onClear() {
    this.resetForm();
  }

  resetForm() {
    this.listForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }


}
