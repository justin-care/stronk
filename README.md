# Stronk - Workout Tracking App

A simple, offline-first workout tracking application built with React and Dexie.js for local data storage.

## What it does

Stronk helps you track your workouts with a focus on simplicity and offline functionality. You can:

- **Create new workouts** with custom names
- **Track different exercise types**: weights, cardio, and custom exercises
- **Record detailed workout data**: sets, reps, weights, and notes
- **View workout history** with completed workouts
- **Work offline** - all data is stored locally in your browser

## How it works

The app automatically routes you based on your current workout status:

- **No workouts**: Redirects to create your first workout
- **Active workout**: Takes you to continue your current workout
- **All workouts completed**: Shows your workout history

### Features

- **Offline-first**: Uses IndexedDB (via Dexie.js) for local storage
- **Responsive design**: Works on desktop and mobile
- **Real-time updates**: Changes are saved automatically as you type
- **Exercise types**:
  - **Weights**: Track sets, reps, and weight for strength training
  - **Cardio**: Record duration and notes for cardio sessions
  - **Custom**: Add any exercise with custom details

## Tech Stack

- **Frontend**: React 19 with Vite
- **Database**: Dexie.js (IndexedDB wrapper)
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router DOM
- **Icons**: React Icons

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the local URL

Your workout data is stored locally in your browser, so it persists between sessions and works completely offline.
