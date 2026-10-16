import { TodoModel } from './src/model/models.js';
import { TodoView } from './src/view/views.js';
import { TodoController } from './src/control/controllers.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new TodoModel();
    const view = new TodoView();

    const app = new TodoController(model, view);
});