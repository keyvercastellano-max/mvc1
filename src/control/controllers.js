export class TodoController {
    constructor(model, view) {

        //Asignar el modelo y la vista
        this.model = model
        this.view = view

        //Renderizar los todos
        this.onTodoListChanged(this.model.todos)

        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)
        this.model.bindTodoListChanged(this.onTodoListChanged)

        this.view.bindEditTodo(this.handleEditTodo)
    }

    //Actualizar la vista
    onTodoListChanged = (todos) => {
        this.view.displayTodos(todos)
    }

    //Agregar un todo
    handleAddTodo = (todoText) => {
        this.model.addTodo(todoText)
    }

    //Editar un todo
    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }

    //Borrar un todo
    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id)
    }

    //Marcar un todo como completado
    handleToggleTodo = (id) => {
        this.model.toggleTodo(id)
    }
}