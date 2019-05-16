import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAccion, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtNewValue') txtNewValue: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkField.valueChanges
      .subscribe(
        valor => {
          console.log(valor);
          const action = new ToggleTodoAction(this.todo.id);
          this._store.dispatch(action);
        }
      );
  }

  editar() {
    this.editando = true;
    setTimeout(
      () => {
        this.txtNewValue.nativeElement.select();
      }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    const action = new EditarTodoAccion(this.todo.id, this.txtInput.value);
    this._store.dispatch(action);
  }

  borrarTodo() {

    const accion = new BorrarTodoAction( this.todo.id );
    this._store.dispatch( accion );
  }


}
