const initialTables = [
    {
        title: 'Todo',
        tasks: []
    },
    {
        title: 'In Progress',
        tasks: []
    },
    {
        title: 'Done',
        tasks: []
    }
];


window.onload = (event) => {
    let tables = initialTables;

    let updatedTaskId = null;

    const nextTaskAction = (task) => (event) => {
        const taskId = task.id;

        let currentIndex = tables.findIndex(table => table.tasks.find(task => task.id === taskId));
        let nextIndex = currentIndex + 1;
        tables = tables.map((table, index) => {
            if(currentIndex === tables.length - 1) return table;

            if(currentIndex === index) {
                table.tasks = table.tasks.filter(task => task.id !== taskId)
            } else if(nextIndex === index) {
                table.tasks.push(task)
            };
            return table;
        });
        render();

        return tables;
    }

    const deleteTaskAction = (task) => (event) => {
        const taskId = task.id;
        tables = tables.map(table => {
            table.tasks = table.tasks.filter(task => task.id !== taskId);
            return table;
        });
        render();

        return tables;
    }

    const formAction =  (event) => {
        event.preventDefault();
        if(updatedTaskId) {
            putTaskAction(event);
        } else {
            createTaskAction(event);
        }
        render();
    }

    const putTaskAction = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get('title');
        tables = tables.map(table => {
            table.tasks = table.tasks.map(task => {
                if(task.id === updatedTaskId) {
                    task.title = title;
                }
                return task;
            });
            return table;
        });
        updatedTaskId = null;
    }

    const createTaskAction = (event) => {
        const formData = new FormData(event.target);

        const title = formData.get('title');
        const id = Date.now();
        tables[0].tasks.push({ id, title });
    }

    const updateTaskAction = (task) => (event) => {
        updatedTaskId = task.id;
        render();
    }

    const createTask = (task) => {
        const { title, id } = task;
        
        let taskElement = document.createElement('div');
        taskElement.classList.add('card', 'mb-1');
        taskElement.id = `task.${id}`;

        let taskBodyElement = document.createElement('div');

        let titleElement = document.createElement('p');
        titleElement.appendChild(document.createTextNode(title));
        taskBodyElement.appendChild(titleElement);


        
        nextTitleTable = tables[tables.findIndex(table => table.tasks.find(task => task.id === id)) + 1]?.title ?? null;
        if(nextTitleTable) {
            let buttonElement = document.createElement('button');
            buttonElement.classList.add('btn', 'btn-primary');
            buttonElement.appendChild(document.createTextNode(nextTitleTable));
            buttonElement.addEventListener('click', nextTaskAction(task));
            taskBodyElement.appendChild(buttonElement);
        }

        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('btn', 'btn-danger', 'ml-2');
        deleteButtonElement.appendChild(document.createTextNode('Delete'));
        deleteButtonElement.addEventListener('click', deleteTaskAction(task));

        if(nextTitleTable) {
            let updateButtonElement = document.createElement('button');
            updateButtonElement.classList.add('btn', 'btn-warning', 'ml-2');
            updateButtonElement.appendChild(document.createTextNode('Update'));
            updateButtonElement.addEventListener('click', updateTaskAction(task));
            taskBodyElement.appendChild(updateButtonElement);
        }
        
        taskBodyElement.classList.add('card-body');
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
        
        return listTablesElement;
    }

    const createForm = () => {
        let formElement = document.getElementById('form');
        formElement.innerHTML = '';

        formElement.removeEventListener('submit', formAction)
        formElement.addEventListener('submit', formAction)

        let inputWrappedElement = document.createElement('div');
        inputWrappedElement.classList.add('col-8');

        let inputElement = document.createElement('input');
        inputElement.classList.add('form-control');
        inputElement.setAttribute('placeholder', 'Name New Todo');
        inputElement.setAttribute('name', 'title');

        task = getTaskById(updatedTaskId);
        inputElement.setAttribute('value', task ? task.title : '');

        let buttonElement = document.createElement('input');
        buttonElement.classList.add('btn', 'btn-primary', 'col-4');
        buttonElement.setAttribute('type', 'submit');
        buttonElement.setAttribute('value', task? 'Update' : 'Create');
        

        inputWrappedElement.appendChild(inputElement);
        formElement.appendChild(inputWrappedElement);
        formElement.appendChild(buttonElement);

        return formElement;
    }

    const getTaskById = (id) => {
        return tables.reduce((acc, table) => {
            const task = table.tasks.find(task => task.id === id);
            if(task) {
                acc = task;
            }
            return acc;
        }, null);
    }
    
    const render = () => {
        setStorage(tables);
        createForm();
        createTables(tables);

        return true;
    };

    const setStorage = (tables) => {
        const tablesJSON = JSON.stringify(tables);
        localStorage.setItem('tables', tablesJSON);
        
        return tables;
    }

    const getStorage = () => {
        tables = JSON.parse(localStorage.getItem('tables')) ?? initialTables;
        return tables;
    }

    const init = () => {
        getStorage();
        render();
    }

    init();
};