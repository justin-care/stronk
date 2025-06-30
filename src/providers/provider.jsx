import React, { createContext, useContext, useEffect, useState } from "react";
import db from "../db/db";

const WorkoutContext = createContext();
export function WorkoutProvider({ userId, children }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const refreshWorkouts = async () => {
      setLoading(true);
      try {
        const result = await db.workouts.where('userId').equals(userId).toArray();
        setWorkouts(result);
      } catch (error) {
        console.error('Error loading workouts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const addWorkout = async (workout) => {
      await db.workouts.add(workout);
      refreshWorkouts();
    };
  
    const updateWorkoutById = async (id, changes) => {
      await db.workouts.update(id, changes);
      refreshWorkouts();
    };
  
    const deleteWorkoutById = async (id) => {
      await db.workouts.delete(id);
      refreshWorkouts();
    };

    const deleteAllWorkouts = async () => {
      await db.workouts.clear();
      refreshWorkouts();
    };
  
    useEffect(() => {
      refreshWorkouts();
    }, [userId]);
  
    return (
      <WorkoutContext.Provider value={{ workouts, loading, addWorkout, updateWorkoutById, deleteWorkoutById, deleteAllWorkouts }}>
        {children}
      </WorkoutContext.Provider>
    );
}

  export function useWorkouts() {
    return useContext(WorkoutContext);
}