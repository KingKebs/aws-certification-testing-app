# Lightweight Testing Application

This is a lightweight testing application that allows users to answer questions and check their answers. The application is built using TypeScript and follows a modular architecture.

## Project Structure

```
lightweight-testing-app
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── controllers
│   │   └── questionController.ts # Handles question-related requests
│   ├── models
│   │   └── question.ts          # Defines the Question model
│   ├── routes
│   │   └── questionRoutes.ts     # Defines application routes
│   ├── services
│   │   └── questionService.ts     # Contains business logic for questions
│   └── views
│       └── index.html           # Main HTML file for user interface
├── package.json                 # npm configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd lightweight-testing-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Compile TypeScript files:**
   ```
   npm run build
   ```

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the testing application.
- Users can view questions and submit their answers through the interface.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.