document.addEventListener("DOMContentLoaded", function () {
    const reminderForm = document.getElementById("reminder-form");
    const reminderList = document.getElementById("reminder-list");

    // Load reminders from local storage when the page loads
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];

    function saveRemindersToLocalStorage() {
        localStorage.setItem("reminders", JSON.stringify(savedReminders));
    }

    // Function to add a reminder to the list and save it to local storage
    function addReminderToList(title, date, description) {
        const reminderItem = document.createElement("li");
        reminderItem.innerHTML = `
            <div class="reminder-content">
                <h3>${title}</h3>
                <p><strong>Date:</strong> ${date}</p>
                ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
            </div>
            <div class="reminder-actions">
                <button class="complete-button">Completed</button>
                <button class="remove-button">Remove</button>
            </div>
        `;

        reminderList.appendChild(reminderItem);

        // Add event listeners for hover actions
        reminderItem.addEventListener("mouseenter", function () {
            const actions = reminderItem.querySelector(".reminder-actions");
            actions.style.display = "block";
        });

        reminderItem.addEventListener("mouseleave", function () {
            const actions = reminderItem.querySelector(".reminder-actions");
            actions.style.display = "none";
        });

        // Add event listeners for completing and removing reminders
        const completeButton = reminderItem.querySelector(".complete-button");
        const removeButton = reminderItem.querySelector(".remove-button");

        completeButton.addEventListener("click", function () {
            // Handle completing the reminder (you can add your logic here)
            reminderItem.style.textDecoration = "line-through";
            saveRemindersToLocalStorage();
        });

        removeButton.addEventListener("click", function () {
            // Handle removing the reminder
            reminderList.removeChild(reminderItem);
            savedReminders.splice(savedReminders.indexOf(title), 1); // Remove from saved reminders
            saveRemindersToLocalStorage();
        });

        // Save the reminder to local storage
        savedReminders.push({ title, date, description });
        saveRemindersToLocalStorage();
    }

    // Load saved reminders from local storage and display them
    for (const reminder of savedReminders) {
        addReminderToList(reminder.title, reminder.date, reminder.description);
    }

    reminderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;

        // Add the reminder to the list and save it to local storage
        addReminderToList(title, date, description);

        // Clear the form fields
        reminderForm.reset();
    });
});
