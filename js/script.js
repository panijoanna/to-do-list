{
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

}