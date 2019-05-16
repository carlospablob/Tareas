import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a thanos');
const todo2 = new Todo('Salvar al mundo');
todo1.completado = true;
const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];
            break;
        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
            break;
        case fromTodo.EDITAR_TODO:
            return state.map(
                todo => {
                    if (todo.id === action.id) {
                        return {
                            ...todo,
                            texto: action.texto
                        };
                    } else {
                        return todo;
                    }
                }
            );
        default:
            return state;
            break;
    }
}
