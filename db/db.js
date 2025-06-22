import Dexie from 'dexie';

const db = new Dexie('WorkoutDB');

const workoutSchema = {
    id: 'id',
    userId: 'userId',
    date: 'date',
    notes: '',
    exercises: []
}

db.version(1).stores({
    workouts: workoutSchema
})

export function createWorkoutSession(workoutSchema) {
    return db.workouts.add(workoutSchema);
}

export function getAllWorkoutsForUser(userId) {
    return db.workouts.where('userId').equals(userId).toArray();
}

export function getWorkoutById(id) {
    return db.workouts.get(id);
}

export function deleteWorkout(id) {
    return db.workouts.delete(id);
}

export function updateWorkout(id, changes) {
    return db.workouts.update(id, changes);
}

export default db;