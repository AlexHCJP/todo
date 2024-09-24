window.onload = (event) => {
    let tables = [
        {
            title: 'Todo',
            tasks: [
                {
                    id: 1,
                    title: 'Task 1',

                }
            ]
        },
        {
            title: 'In Progress',
            tasks: []
        },
        {
            title: 'Done',
            tasks: []
        }
    ]

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
        
        return listTablesElement;
    }

    const createTaskAction =  (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title');
        const id = Date.now();
        tables[0].tasks.push({ id, title });
        render();
    }

    const createForm = () => {
        let formElement = document.getElementById('form');
        formElement.innerHTML = '';
        formElement.removeEventListener('submit', createTaskAction)
        formElement.addEventListener('submit', createTaskAction)

        let inputWrappedElement = document.createElement('div');
        inputWrappedElement.classList.add('col-8');

        let inputElement = document.createElement('input');
        inputElement.classList.add('form-control');
        inputElement.setAttribute('placeholder', 'Name New Todo');
        inputElement.setAttribute('name', 'title');

        let buttonElement = document.createElement('input');
        buttonElement.classList.add('btn', 'btn-primary', 'col-4');
        buttonElement.setAttribute('type', 'submit');
        buttonElement.setAttribute('value', 'Create');
        

        inputWrappedElement.appendChild(inputElement);
        formElement.appendChild(inputWrappedElement);
        formElement.appendChild(buttonElement);

        return formElement;
    }
    
    const render = () => {
        createForm();
        createTables(tables);
    };

    render();
};