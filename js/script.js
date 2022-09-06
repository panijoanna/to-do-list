{
    let tasks = [];
    let hideDoneTasks = false;

    const hideTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        let taskLiElements = document.querySelectorAll(".js-task");

        if (hideDoneTasks) {

        }
        render();
    };

    const removeTask = (itemIndex) => {
        tasks = [
            ...tasks.slice(0, itemIndex),
            ...tasks.slice(itemIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (itemIndex) => {
        tasks[itemIndex] = {
            ...tasks[itemIndex],
            done: !tasks[itemIndex].done,
        };

        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        const listButton = document.querySelector(".lists__button--allDone");
        listButton.disabled = "disabled";

        render();
    }

    const addTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false
            },
        ];

        render();
    };

    const removeEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, itemIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(itemIndex);
            });
        });
    };

    const toggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, itemIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(itemIndex);
            });
        });

    };

    const renderTasks = () => {
        let listHTMLContent = "";

        for (const task of tasks) {
            listHTMLContent += `
            <li class="tasks__item js-task" ${task.done && hideDoneTasks ? "hidden" : ""}>
            <button class="tasks__button tasks__button--toggleDone js-toggleDone">
            ${task.done ? "✓" : ""}
            </button>
            <span class="tasks__content${ task.done ? " tasks__content--toggleDone" : ""}">
            ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">
            🗑
            </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = listHTMLContent;

    };

    const renderButtons = () => {
        let renderedButtons = "";

        if (tasks.length > 0) {
            renderedButtons += `
        <button class="lists__button lists__button--hide js-toggleButton">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button class="lists__button lists__button--allDone js-toggleAllDone">
        Ukończ wszystkie
        </button>
        `;
        }

        document.querySelector(".js-buttons").innerHTML = renderedButtons;
    };

    const bindButtonsEvents = () => {
        const listButton = document.querySelector(".lists__button--allDone");
        const hideButton = document.querySelector(".lists__button--hide");

        if (listButton != null && hideButton != null) {
            listButton.addEventListener("click", toggleAllTasksDone);
            hideButton.addEventListener("click", hideTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        removeEvents();
        toggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskItem = document.querySelector(".js-newTask");
        const newTaskContent = newTaskItem.value.trim();

        if (newTaskContent !== "") {
            addTask(newTaskContent);
            newTaskItem.value = "";
        }

        newTaskItem.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}