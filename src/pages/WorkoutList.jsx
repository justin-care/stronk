import ContentArea from '../components/ContentArea.jsx'
import WorkoutListItem from '../components/WorkoutListItem.jsx'
import { useWorkouts } from '../providers/provider.jsx'

const WorkoutList = () => {
    const { workouts, deleteWorkoutById } = useWorkouts();
    
    // Only show completed workouts and sort by most recent date
    const completedWorkouts = workouts
        .filter(w => w.completed)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDeleteWorkout = async (workoutId) => {
        await deleteWorkoutById(workoutId);
    };

    const children = (
        <div className="flex flex-col gap-4">
            <h1 className="mb-4">Workout History</h1>
            {completedWorkouts.length === 0 ? (
                <div className="text-gray-500">No completed workouts found.</div>
            ) : (
                completedWorkouts.map((workout, index) => {
                    if (index === 0) {
                        return (
                            <WorkoutListItem
                                isFirst={true}
                                key={workout.id}
                                workout={workout}
                                onDelete={handleDeleteWorkout}
                            />
                        )
                    } else {
                        return (
                            <WorkoutListItem
                                isFirst={false}
                                key={workout.id}
                                workout={workout}
                                onDelete={handleDeleteWorkout}
                            />
                        )
                    }
                })
            )}
        </div>
    )

    return (
        <ContentArea children={children} />
    )
}

export default WorkoutList;