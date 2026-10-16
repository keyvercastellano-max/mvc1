export class TodoView {
    constructor() {

        //Raiz
        this.app = this.getElement('#root')

        //Titulo
        this.title = this.createElement('h1')
        this.title.textContent = 'Ejemplo de MVC'

        //El formulario
        this.form = this.createElement('form')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Escribe Algo:'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Subir'

        //Lo visual
        this.todoList = this.createElement('ul', 'todo-list')

        //DOM
        this.form.append(this.input, this.submitButton)

        this.app.append(this.title, this.form, this.todoList)

        this._temporaryTodoText
        this._initLocalListeners()
        
    }

    //Crear elementos
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    //Obtener elementos
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    //Getter para obtener el texto del input
    get _todoText() {
        return this.input.value
    }

    //Resetear el input
    _resetInput() {
        this.input.value = ''
    }

    //Mostrar los todos
    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Aun Nada :P, agrega algo!'
            this.todoList.append(p)
        } else {
            todos.forEach((todo) => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Borrar'
                li.append(checkbox, span, deleteButton)

                this.todoList.append(li)
            })
        }
    }

    //Bind para agregar un todo
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
        event.preventDefault()
            if (this._todoText) {
                handler(this._todoText)
                this._resetInput()
            }
        })
    }

    //Bind para borrar un todo
    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    //Bind para marcar un todo como completado
    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    //Bind para editar un todo
    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText
            }
        })
    }

    //Bind para editar un todo
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id)

                handler(id, this._temporaryTodoText)
                this._temporaryTodoText = ''
            }
        })
    }
}