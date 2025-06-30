import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentArea from '../components/ContentArea.jsx'
import { useWorkouts } from '../providers/provider.jsx'
import { useToast } from '../providers/ToastProvider.jsx'
import Exercise from '../components/Exercise.jsx'

const initialExercise = () => ({
    type: '',
    name: '',
    sets: [{ weight: '', reps: '' }],
    details: '',
});

const ActiveWorkoutView = () => {
    const { workouts, updateWorkoutById } = useWorkouts()
    const { success } = useToast()
    const [exercises, setExercises] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Find the active workout (completed === false)
    const activeWorkout = workouts.find(w => w.completed === false);

    // Only hydrate exercises from Dexie once per workout session
    useEffect(() => {
        if (
            activeWorkout &&
            !activeWorkout.completed &&
            !hydrated
        ) {
            setExercises(Array.isArray(activeWorkout.exercises) ? activeWorkout.exercises : []);
            setHydrated(true);
        }
    }, [activeWorkout, hydrated]);

    // Add a new/empty exercise row at the end
    const allExercises = [...exercises, initialExercise()];

    const updateWorkout = () => {
        if (activeWorkout) {
            updateWorkoutById(activeWorkout.id, {
                exercises: exercises,
            });
        }
    }

    // Handlers for editing exercises in the list (including the new row)
    const handleExerciseChange = (idx, field, value) => {
        if (idx === exercises.length) {
            // Editing the new row
            const newRow = { ...allExercises[idx], [field]: value };
            setExercises([...exercises, newRow]);
        } else {
            setExercises(prev => prev.map((ex, i) =>
                i === idx ? { ...ex, [field]: value } : ex
            ));
        }
        updateWorkout();
    };
    const handleExerciseSetChange = (exIdx, setIdx, field, value) => {
        if (exIdx === exercises.length) {
            // Editing the new row
            const newSets = allExercises[exIdx].sets.map((set, j) =>
                j === setIdx ? { ...set, [field]: value } : set
            );
            const newRow = { ...allExercises[exIdx], sets: newSets };
            setExercises([...exercises, newRow]);
        } else {
            setExercises(prev => prev.map((ex, i) => {
                if (i !== exIdx) return ex;
                const newSets = ex.sets.map((set, j) =>
                    j === setIdx ? { ...set, [field]: value } : set
                );
                return { ...ex, sets: newSets };
            }));
        }
        updateWorkout();
    };

    const handleExerciseAddSet = (exIdx) => {
        if (exIdx === exercises.length) {
            // Editing the new row
            const newRow = {
                ...allExercises[exIdx],
                sets: [...allExercises[exIdx].sets, { weight: '', reps: '' }],
            };
            setExercises([...exercises, newRow]);
        } else {
            setExercises(prev => prev.map((ex, i) =>
                i === exIdx ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] } : ex
            ));
        }
        updateWorkout();
    };
    const handleExerciseRemoveSet = (exIdx, setIdx) => {
        if (exIdx === exercises.length) {
            // Editing the new row
            const newRow = {
                ...allExercises[exIdx],
                sets: allExercises[exIdx].sets.filter((_, j) => j !== setIdx),
            };
            setExercises([...exercises, newRow]);
        } else {
            setExercises(prev => prev.map((ex, i) =>
                i === exIdx ? { ...ex, sets: ex.sets.filter((_, j) => j !== setIdx) } : ex
            ));
        }
        updateWorkout();
    };
    const handleExerciseDetailsChange = (idx, value) => {
        if (idx === exercises.length) {
            // Editing the new row
            const newRow = { ...allExercises[idx], details: value };
            setExercises([...exercises, newRow]);
        } else {
            setExercises(prev => prev.map((ex, i) =>
                i === idx ? { ...ex, details: value } : ex
            ));
        }
        updateWorkout();
    };
    const handleRemoveExercise = (idx) => {
        setExercises(prev => prev.filter((_, i) => i !== idx));
        updateWorkout();
    };

    const handleAddExercise = (idx) => {
        // Only add if type and name are filled
        const ex = allExercises[idx];
        if (!ex.type || !ex.name) return;
        setExercises(prev => [...prev, ex]);
        updateWorkout();
    };

    //TODO: Add in validation so that there are no empty fields in exercises.
    const handleCompleteWorkout = async () => {
        setCompleted(true);
        if (activeWorkout) {
            await updateWorkoutById(activeWorkout.id, {
                exercises,
                completed: true,
            });
            success('Workout completed successfully! 💪', 4000);
        }
    };

    const children = (
        <div className="flex flex-col justify-start h-full w-full">
            <h2 className="text-lg font-bold mb-2">Exercises</h2>
                <div className="flex flex-col gap-4">
                    {allExercises.map((ex, idx) => (
                        <div key={idx} className="p-2 border rounded bg-base-200">
                            <Exercise
                                type={ex.type}
                                name={ex.name}
                                sets={ex.sets}
                                details={ex.details}
                                onTypeChange={e => handleExerciseChange(idx, 'type', e.target.value)}
                                onNameChange={e => handleExerciseChange(idx, 'name', e.target.value)}
                                onSetChange={(setIdx, field, value) => handleExerciseSetChange(idx, setIdx, field, value)}
                                onAddSet={() => handleExerciseAddSet(idx)}
                                onRemoveSet={setIdx => handleExerciseRemoveSet(idx, setIdx)}
                                onDetailsChange={e => handleExerciseDetailsChange(idx, e.target.value)}
                                disabled={completed}
                                onRemove={idx < exercises.length ? () => handleRemoveExercise(idx) : undefined}
                                onAdd={idx === exercises.length ? () => handleAddExercise(idx) : undefined}
                                showAddButton={idx === exercises.length && !completed}
                            />
                        </div>
                    ))}
                </div>
            {exercises.length > 0 && !completed && (
                <button className="btn btn-success mt-6 self-center text-2xl p-6" onClick={handleCompleteWorkout}>
                    Complete Workout
                </button>
            )}
            {completed && (
                <div className="alert alert-success mt-6">Workout completed and saved!</div>
            )}
        </div>
    )

    return (
        <ContentArea children={children} />
    )
}

export default ActiveWorkoutView;