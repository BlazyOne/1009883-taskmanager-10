import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {render} from './utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
