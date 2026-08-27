# Palateer — Recipe Discovery & Meal Planning App

## Explore. Plan. Cook.

[![View App](https://img.shields.io/badge/▶_View_App-Palateer-b6d7a8?style=for-the-badge)](https://bilodav.github.io/Palateer/)

A responsive React application for browsing recipes, planning a week of
meals, and saving favorites. Built for a local cooking school's capstone
project, demonstrating component architecture, hooks-based state
management, routing, and multimedia integration.

## Features

- **Recipe browsing** — search by title, filter by category, cuisine,
  and difficulty, with clear/reset controls
- **Recipe detail pages** — full ingredient lists, step-by-step
  instructions, an embedded cooking tutorial video, and an audio tips
  clip
- **Weekly meal planner** — seven day cards (Monday–Sunday), each with
  breakfast/lunch/dinner slots; add or remove recipes per slot; clear
  the whole week
- **Favorites** — save/unsave any recipe, with a live count in the nav
  and a dedicated favorites page (including an empty state)
- **Responsive navigation** — sticky top nav with active-route
  highlighting on desktop, a hamburger/bottom-tab layout on mobile
- **Persistent state** — favorites and the meal plan are saved to
  `localStorage` and reload with the app
- **Loading, empty, and error states** throughout, so the UI never
  looks broken while data is fetching or absent

## Tech stack

- React (functional components + hooks only, no class components)
- React Router DOM — client-side routing
- PropTypes — runtime props validation
- CSS Modules — component-scoped styling
- Vite (or Create React App) — build tooling

## Getting started

```bash
npm install
npm start
```

The app runs at `http://localhost:5173` (Vite) or `http://localhost:3000`
(CRA).

## Project structure

```
src/
├── components/
│   ├── Navigation/      Navbar
│   ├── Recipe/           RecipeCard, RecipeList, RecipeDetail, RecipeFilter
│   ├── MealPlanner/      MealPlanner, DayCard
│   ├── Media/            VideoPlayer, AudioPlayer
│   ├── UI/                Button, Card, SearchBar, Loading, Modal
│   └── common/            Header, Footer
├── pages/                Home, RecipesPage, MealPlannerPage, FavoritesPage, NotFound
├── data/                 recipesData.js — sample recipe dataset
├── utils/                helpers.js — formatting and filtering helpers
├── App.jsx
└── index.js
```

## Component overview

| Component                                         | Purpose                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| `Navbar`                                          | Route links, active styling, responsive hamburger menu |
| `RecipeCard`                                      | Recipe summary — image, title, time, favorite toggle   |
| `RecipeList`                                      | Maps an array of recipes to `RecipeCard`s              |
| `RecipeDetail`                                    | Full recipe view with ingredients, steps, video/audio  |
| `RecipeFilter`                                    | Category, cuisine, and difficulty filter controls      |
| `MealPlanner`                                     | Container holding the seven `DayCard`s                 |
| `DayCard`                                         | One day's breakfast/lunch/dinner slots; reused 7x      |
| `VideoPlayer` / `AudioPlayer`                     | HTML5 media wrappers with fallback text                |
| `Button`, `Card`, `SearchBar`, `Loading`, `Modal` | Shared, reusable UI primitives                         |

## State management

Shared state (`favorites`, `mealPlan`, `recipes`) lives in `App.jsx` and
is lifted down to pages via props, with callback props lifting user
actions (favorite toggles, meal-plan edits) back up. Local UI state
(search term, filter selections, modal visibility) stays inside the
component that owns it. Favorites and the meal plan sync to
`localStorage` via `useEffect`.

## Routing

| Route           | Page                          |
| --------------- | ----------------------------- |
| `/`             | Home                          |
| `/recipes`      | Recipe browsing + filters     |
| `/recipes/:id`  | Recipe detail (dynamic route) |
| `/meal-planner` | Weekly meal planner           |
| `/favorites`    | Saved recipes                 |
| `*`             | 404 Not Found                 |

## Future enhancements

- Drag-and-drop meal planning instead of add/remove buttons
- Shopping list generated from a week's planned meals
- User accounts so favorites/meal plans sync across devices
- Nutrition info per recipe and per planned day

## Screenshots

_To be added as the UI is built: Home, Recipes with filters, Recipe
detail with video, Meal planner, Favorites, Mobile view._
