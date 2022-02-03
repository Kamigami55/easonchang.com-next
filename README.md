# Next.js Starter Echo

Awesome Next.js starter template made by Eason Chang

[Demo site](https://nextjs-starter-echo.vercel.app/)

[Storybook demo site](https://main--61787e383ce216004a69e924.chromatic.com/)

## features

- Next.js 12
- TailwindCSS
- Atomic design project structure
- Storybook
- Absolute import
- Hygen as code generator
- Eslint, Prettier
- Husky, lint-staged pre-commit hook

## Commands

### Start local dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Start Storybook component dev environment

```bash
yarn storybook
```

This command will open [http://localhost:6006](http://localhost:6006) for you, this is where you can see storybook

### Generate new component scaffold

```bash
yarn new-component
```

This calls hygen to generate new component with basic file structures, including its JS file and stories.js file

You will be prompted to select component type (atoms, molecules, organisms, templates), and then input component name
