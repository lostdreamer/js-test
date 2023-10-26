import List from  "./List.js"
import {ApiStorage, BrowserStorage} from  "./Storage.js"
import TasksPage from "./views/TasksPage.js";


// const storage = new BrowserStorage('tasks', window.localStorage);
// const storage = new BrowserStorage('tasks', window.sessionStorage);
const storage = new ApiStorage('tasks');

const tasks = new List(storage);
const tasksPage = new TasksPage('app', tasks);

await tasks.loading;


tasksPage.render();