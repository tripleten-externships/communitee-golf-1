# CommuniteeGolf Chat Extension

A Chrome browser extension for CommuniteeGolf chat functionality.

## Features

- User authentication
- Real-time chat messaging
- Chrome extension integration

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Chrome Extensions API (Manifest V3)
- Storybook for component documentation

## Development

### Prerequisites

- Node.js (v22.12.0 or higher)
- npm (v9.5.1 or higher)
- Chrome browser

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd communitee-golf-template
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory

### Building

To build the extension for production:

```bash
npm run build
```

The built extension will be in the `dist` directory.

### Development with Storybook

To run Storybook for component development:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view the Storybook interface.

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and service integrations
│   └── main.tsx       # Entry point
├── public/
│   └── icons/         # Extension icons
└── .storybook/        # Storybook configuration
```

## GitHub Actions

The project includes GitHub Actions workflows for:

- Automated testing
- Building and packaging the extension
- Creating releases

## Contributing

### No Commits To Main

Contributors are not allowed to commit directly to `main`. This rule is enforced using git hooks. Instead, you must create a new branch off of `main` using the following naming pattern:

```
Pattern:"/^(master|main|develop){1}$|^(feature|fix|hotfix|release)\/.+$/g"
```

Example:
`feature/my-dev-task`

### Commit messages

If your commit message does not conform to the correct pattern, you will receive an error message like the following:

```
  ************* Invalid Git Commit Message **************
  commit message: Added husky git hooks
  correct format: <type>[scope]: <subject>
  example: docs: update README to add developer tips

  type:
    feat     A new feature.
    fix      A bug fix.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

## Helpful Resources

This project uses the following key libraries

- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Tailwind Components](https://tailwindui.com/components)
- [Headless UI](https://headlessui.com/)
- [Vite JS](https://vitejs.dev/)
- [Storybook JS](https://storybook.js.org/)
