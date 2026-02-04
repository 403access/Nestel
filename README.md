# Nestel 🍞✨

Nestel is an Expo project designed to facilitate learning about the processes and products at the Nestel bakery. It offers an interactive experience where users can explore product details and test their knowledge.

## Features 🚀

- **Learning Processes and Products:** 📖 Explore detailed information about various products and the processes involved in their creation at the Nestel bakery.
- **Quiz:** 🧠 Test your knowledge about Nestel's products and bakery processes through an interactive quiz.
- **Filtering:** 🔍 Filter products based on categories, ingredients, and allergens for easier exploration.
- **Responsive UI:** 📱💻 Built with React Native for a consistent experience across Android, iOS, and Web.
- **Navigation:** 🗺️ Utilizes Expo Router for seamless, file-based navigation.
- **Theming:** 🎨 Supports both light and dark themes.

## Technologies Used 🛠️

- **Expo:** A framework and platform for universal React applications.
- **React Native:** For building native mobile apps using JavaScript and React.
- **React:** The core JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Expo Router:** For declarative, file-based routing in Expo apps.
- **React Native Reanimated & Gesture Handler:** For fluid animations and gesture control.
- **Biome:** For code formatting.
- **ESLint:** For code linting.

## Get Started 🏁

Follow these steps to set up and run the project locally.

### Prerequisites ✅

Ensure you have Node.js, npm/yarn/bun, and Expo CLI installed.

- Node.js & npm: [nodejs.org](https://nodejs.org/)
- Bun: [bun.sh](https://bun.sh/) (Recommended)
- Expo CLI: `npm install -g expo-cli`

### Installation ⬇️

1.  **Clone the repository:** 🔗
    ```bash
    git clone https://github.com/your-username/nestel.git
    cd nestel
    ```

2.  **Install dependencies:** 📦
    Using Bun (recommended):
    ```bash
    bun install
    ```
    Or using npm:
    ```bash
    npm install
    ```

### Running the Application ▶️

To start the development server:
```bash
bun start
# or
npm start
```

This will open Expo Dev Tools in your browser. You can then:
-   **Run on Android:** 🤖 Press `a` in the terminal or click "Run on Android" in Dev Tools.
-   **Run on iOS:** 🍎 Press `i` in the terminal or click "Run on iOS simulator" in Dev Tools (requires Xcode).
-   **Run on Web:** 🌐 Press `w` in the terminal or click "Run on web browser" in Dev Tools.

## Project Structure 📁

-   `app/`: Contains the application's screens, routes, and navigation logic, leveraging Expo Router's file-based conventions.
-   `assets/`: Stores static assets like images.
-   `components/`: Reusable UI components used throughout the application.
-   `constants/`: Defines constants such as theme variables.
-   `data/`: Mock data for products, categories, allergens, and ingredients.
-   `hooks/`: Custom React hooks for various functionalities (e.g., `use-product-search`, `use-color-scheme`).
-   `scripts/`: Utility scripts for project maintenance.

## Learn More 📚

-   [Expo Documentation](https://docs.expo.dev/): Comprehensive guides and API references.
-   [React Native Documentation](https://reactnative.dev/): Learn more about React Native development.
-   [Expo Router Documentation](https://docs.expo.dev/router/introduction/): Deep dive into file-based routing with Expo.

## Contributing 🤝

(Add contribution guidelines here if applicable)

## License 📜

See [LICENSE](./LICENSE).
