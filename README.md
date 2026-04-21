# Advanced To-Do App

A lightweight, zero-dependency to-do application built with vanilla HTML, CSS, and JavaScript.

## Features

- **Add tasks** — type a task and press **Add** or hit **Enter**
- **Complete / Undo** — toggle a task's completion status with a single click
- **Edit tasks** — update the text of any existing task via a prompt
- **Delete tasks** — remove tasks you no longer need
- **Filter view** — switch between **All**, **Pending**, and **Completed** tasks
- **Dark mode** — toggle between light and dark themes
- **Persistent storage** — tasks are saved to `localStorage` and survive page refreshes

## Getting Started

No build step or server is required. Simply open `index.html` in any modern browser:

```bash
# Clone the repository
git clone https://github.com/SDRasanjana/to-do-app.git
cd to-do-app

# Open in your default browser (macOS)
open index.html

# Open in your default browser (Linux)
xdg-open index.html

# Open in your default browser (Windows)
start index.html
```

## Project Structure

```
to-do-app/
├── index.html   # Application markup
├── style.css    # Styles (light & dark themes via CSS custom properties)
└── app.js       # Application logic
```

## Usage

| Action | How |
|--------|-----|
| Add a task | Type in the input field and click **Add** or press **Enter** |
| Complete a task | Click the **Complete** button next to a task |
| Undo completion | Click the **Undo** button next to a completed task |
| Edit a task | Click **Edit**, update the text in the prompt, and confirm |
| Delete a task | Click **Delete** next to any task |
| Filter tasks | Click **All**, **Pending**, or **Completed** in the filter bar |
| Toggle dark mode | Click **Dark Mode** / **Light Mode** in the top-right corner |

## Browser Support

Works in any modern browser that supports ES6+ and the Web Storage API (Chrome, Firefox, Edge, Safari).

## License

This project is open source. See the repository for license details.
