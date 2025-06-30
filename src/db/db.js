import Dexie from 'dexie';

const db = new Dexie('WorkoutDB');

db.version(1).stores({
    workouts: 'id, userId, date'
})

export default db;