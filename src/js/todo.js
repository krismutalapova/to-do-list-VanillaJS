let todo;
if (localStorage.getItem('todo')) {
  todo = JSON.parse(localStorage.getItem('todo'));
} else {
  todo = {
    pending: [],
    done: [],
  };
}

const removeBtn = '<svg height="50px" viewBox="-40 0 427 427.00131" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>';
const tickBtn = '<svg height="50px" viewBox="0 0 448 448.55357" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="m224.550781 0c-123.667969 0-224.273437 100.605469-224.273437 224.277344 0 123.667968 100.605468 224.277344 224.273437 224.277344 123.664063 0 224.269531-100.609376 224.269531-224.277344 0-123.671875-100.605468-224.277344-224.269531-224.277344zm0 430.269531c-113.582031 0-205.988281-92.414062-205.988281-205.992187 0-113.582032 92.40625-205.992188 205.988281-205.992188 113.578125 0 205.984375 92.410156 205.984375 205.992188 0 113.578125-92.40625 205.992187-205.984375 205.992187zm0 0"/><path d="m340.378906 134.847656-159.46875 159.464844-72.191406-72.1875c-3.570312-3.570312-9.355469-3.570312-12.929688 0-3.570312 3.570312-3.570312 9.355469 0 12.929688l78.65625 78.652343c1.785157 1.785157 4.125 2.675781 6.464844 2.675781s4.679688-.890624 6.464844-2.675781l165.933594-165.929687c3.570312-3.570313 3.570312-9.359375 0-12.929688-3.570313-3.570312-9.359375-3.570312-12.929688 0zm0 0"/></svg>';

const storeTodos = () => {
  localStorage.setItem('todo', JSON.stringify(todo));
};

function removeTask() {
  const task = this.parentNode.parentNode;
  const parent = task.parentNode;
  const { id } = parent;
  const value = task.innerText;

  if (id === 'pending') {
    todo.pending.splice(todo.pending.indexOf(value), 1);
  } else {
    todo.done.splice(todo.done.indexOf(value), 1);
  }
  storeTodos();
  parent.removeChild(task);
}

function markAsDone() {
  const task = this.parentNode.parentNode;
  const parent = task.parentNode;
  const { id } = parent;
  const value = task.innerText;

  if (id === 'pending') {
    todo.pending.splice(todo.pending.indexOf(value), 1);
    todo.done.push(value);
  } else {
    todo.done.splice(todo.done.indexOf(value), 1);
    todo.pending.push(value);
  }

  storeTodos();

  let target;
  if (id === 'pending') {
    target = document.querySelector('#done');
  } else {
    target = document.querySelector('#pending');
  }

  parent.removeChild(task);
  target.appendChild(task);
}

const addElems = (text, done) => {
  let list;
  if (done) {
    list = document.querySelector('#done');
  } else {
    list = document.querySelector('#pending');
  }
  const task = document.createElement('li');
  task.innerText = text;

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeBtn;
  remove.addEventListener('click', removeTask);

  const tick = document.createElement('button');
  tick.classList.add('done');
  tick.innerHTML = tickBtn;
  tick.addEventListener('click', markAsDone);

  buttons.appendChild(remove);
  buttons.appendChild(tick);
  task.appendChild(buttons);

  list.appendChild(task);
};

const showList = () => {
  if (todo.pending.length === 0 && todo.done.length === 0) return;
  todo.pending.forEach((task) => addElems(task, false));
  todo.done.forEach((task) => addElems(task, true));
};

const addTask = (e) => {
  e.preventDefault();
  const { value } = document.querySelector('#task');
  const description = document.querySelector('#description').value;
  const task = `${value} | ${description}`;
  if (value) {
    addElems(task);
    document.querySelector('#task').value = '';
    document.querySelector('#description').value = '';
    todo.pending.push(task);
    storeTodos();
  }
};

document.querySelector('#add').addEventListener('click', addTask);

window.addEventListener('load', () => {
  showList();
  const date = document.querySelector('#date');
  const newDate = new Date();
  date.innerHTML = newDate.toDateString();
});
