const createTask = (task) => {
    const { title, id } = task;
    
    let taskElement = document.createElement('div');
    taskElement.classList.add('card', 'mb-1');
    taskElement.id = `task.${id}`;

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-primary');
    buttonElement.appendChild(document.createTextNode('Next'));
    buttonElement.addEventListener('click', nextTaskAction(task));

    let deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('btn', 'btn-danger', 'ml-2');
    deleteButtonElement.appendChild(document.createTextNode('Delete'));
    deleteButtonElement.addEventListener('click', deleteTaskAction(task));

    let titleElement = document.createElement('p');
    titleElement.appendChild(document.createTextNode(title));

    let taskBodyElement = document.createElement('div');
    taskBodyElement.classList.add('card-body');
    taskBodyElement.appendChild(titleElement);
    taskBodyElement.appendChild(buttonElement);
    taskBodyElement.appendChild(deleteButtonElement);

    taskElement.appendChild(taskBodyElement);

    return taskElement;
}

const createTable = (table) => {
    let tableElement = document.createElement('li');
    tableElement.classList.add('list_item', 'mx-2');
    
    let tableBodyElement = document.createElement('div');
    tableBodyElement.classList.add('card');
    tableBodyElement.style.width = '277px';
    
    let tableHeader = document.createElement('h2');
    tableHeader.classList.add('card-header');
    tableHeader.appendChild(document.createTextNode(table.title));
    
    let tableBodyBodyElement = document.createElement('div');
    tableBodyBodyElement.classList.add('card-body');

    tableBodyElement.appendChild(tableHeader);
    tableBodyElement.appendChild(tableBodyBodyElement);

    tableElement.appendChild(tableBodyElement);

    console.log(table);
    table.tasks.forEach(task => {
        tableBodyBodyElement.appendChild(createTask(task));
    });

    return tableElement;
}

const createTables = (tables) => {
    const listTablesElement = document.getElementById('list_tables');
    listTablesElement.innerHTML = '';

    tables.forEach(table => {
        listTablesElement.appendChild(createTable(table));
    });
}