# Workspresso

Workspresso is your trusted companion for finding the perfect coffee shop to work from. Designed to eliminate uncertainty and wasted time, Workspresso provides meticulously curated, work-specific data about venues, including Wi-Fi reliability, power outlet availability, noise levels, and more. Whether you're a freelancer, remote employee, or student, Workspresso helps you discover reliable, comfortable environments to be productive.

Built with [Astro](https://astro.build) and SQLite3. This app is a showcase on how to integrate various AI features into existing web apps. Google Cloud credits are provided for this project. #AISprint

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/rizafahmi/workspresso.git
   cd workspresso
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321` to see the app in action.

## 🚀 Project Structure

Workspresso is built using Astro, a modern framework for building fast and scalable web applications. The app's structure is designed to support the following core user flows:

1. **Discover**: Open the app to find a list or map of vetted, nearby coffee shops.
2. **Evaluate**: View detailed, work-specific information about a venue, such as Wi-Fi reliability, power outlet availability, and noise levels.
3. **Go**: Navigate to the selected venue with confidence, knowing it meets your needs.

The `src/pages/` directory contains the main pages of the app, while `src/components/` houses reusable components for features like venue listings and detail views.

The `src/components/` directory is where you can add any Astro, React, Vue, Svelte, or Preact components to enhance your app.

Static assets such as images, fonts, or other files can be placed in the `public/` directory for direct access. These assets include icons for venue attributes (e.g., Wi-Fi, power outlets) and other visuals that enhance the user experience.

## 🧞 Commands

Here are the commands you can use to manage the project:

All commands are run from the root of the project, from a terminal:

| Command                                                  | Action                                                         |
| :------------------------------------------------------- | :------------------------------------------------------------- |
| `npm install`                                            | Installs dependencies                                          |
| `npm run dev`                                            | Starts the local development server at `http://localhost:4321` |
| `ASTRO_DATABASE_FILE=workspresso-dev.db npm run dev`     | Starts the development server with SQLite persistence          |
| `npm run build`                                          | Build your production site to `./dist/`                        |
| `npm run preview`                                        | Preview your build locally, before deploying                   |
| `ASTRO_DATABASE_FILE=workspresso-dev.db npm run preview` | Preview the build with SQLite persistence                      |
| `npm run astro ...`                                      | Run CLI commands like `astro add`, `astro check`               |
| `npm run astro -- --help`                                | Get help using the Astro CLI                                   |

## 🌟 Core Features

Workspresso focuses on solving the key problems faced by remote workers and students. The MVP includes:

1. **List View**:
   - Displays nearby venues with essential details: venue name, distance, and a "Work-Friendly" score.
2. **Venue Detail View**:
   - Provides critical information:
     - Wi-Fi Reliability: Ratings like "Great for video calls" or "Unreliable."
     - Power Outlet Availability: Ratings like "Plentiful" or "Rare."
     - Noise Level: Ratings like "Quiet" or "Loud."
     - Seating/Space: Ratings like "Spacious" or "Cramped."
   - Includes venue name, address, hours of operation, and a "Get Directions" link.
3. **Compare Venue**:
   - Allow users to compare multiple venues side-by-side based on key attributes such as Wi-Fi reliability, power outlet availability, noise levels, and seating/space.
   - Highlight differences in a clear and concise manner to help users make informed decisions quickly.

4. **Semantic Search**:
   - Implement a search feature that understands user intent and context. For example, users can search for "quiet places with great Wi-Fi" or "venues with plentiful outlets."
   - Use natural language processing (NLP) to deliver accurate and relevant results tailored to the user's needs.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Workspresso, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
