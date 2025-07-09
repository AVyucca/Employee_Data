# Employment Database

This project is an employment database website built using Angular. It allows users to view, add, and manage employee records.

## Features

- Display a list of employees
- Add new employees to the database
- Responsive design for various devices

## Project Structure

```
employment-database
├── src
│   ├── app
│   │   ├── components
│   │   │   └── employee-list
│   │   │       ├── employee-list.component.ts
│   │   │       ├── employee-list.component.html
│   │   │       └── employee-list.component.css
│   │   ├── services
│   │   │   └── employee.service.ts
│   │   ├── models
│   │   │   └── employee.model.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd employment-database
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   ng serve
   ```

5. Open your browser and go to `http://localhost:4200`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.