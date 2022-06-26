{

    const tasks = [];

    const removeTask = (itemIndex) => {
        tasks.splice(itemIndex, 1);
        render();
    };

    const toggleTaskDone = (itemIndex) => {
        tasks[itemIndex].done = !tasks[itemIndex].done;
        render();
    };

    const addTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, itemIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(itemIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, itemIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(itemIndex);
            });
        });
    };

    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li
            class="tasks__item js-task"
            >
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

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;

        bindRemoveEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();


}