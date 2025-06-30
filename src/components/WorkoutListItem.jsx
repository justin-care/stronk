import { useToast } from '../providers/ToastProvider.jsx';

function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    });
}

const WorkoutListItem = ({ workout, onDelete, isFirst }) => {
    const { success, error } = useToast();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this workout? This cannot be undone.')) {
            try {
                await onDelete(workout.id);
                success('Workout deleted successfully! 🗑️', 3000);
            } catch (err) {
                error('Failed to delete workout. Please try again.', 4000);
            }
        }
    };

    return (
        <div className={`collapse collapse-arrow bg-base-200`}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                {workout.name || `Workout`}
            </div>
            <div className="collapse-content flex flex-col gap-2 relative">
                <div className="text-sm text-gray-500 mb-2">
                    <strong>Date:</strong> {formatDate(workout.date)}
                </div>
                {Array.isArray(workout.exercises) && workout.exercises.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {workout.exercises.map((ex, exIdx) => (
                            <div key={exIdx} className="card bg-base-100 shadow p-3 border">
                                <div className="font-bold text-base mb-1 flex flex-row gap-2 items-center">
                                    <span className="badge badge-outline mr-2">{ex.type?.toUpperCase()}</span>
                                    {ex.name}
                                </div>
                                {ex.type === 'weights' && ex.sets && (
                                    <div className="overflow-x-auto">
                                        <table className="table table-xs">
                                            <thead>
                                                <tr>
                                                    <th>Set</th>
                                                    <th>Weight</th>
                                                    <th>Reps</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ex.sets.map((set, setIdx) => (
                                                    <tr key={setIdx}>
                                                        <td>{setIdx + 1}</td>
                                                        <td>{set.weight}</td>
                                                        <td>{set.reps}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {(ex.type === 'cardio' || ex.type === 'custom') && ex.details && (
                                    <div className="bg-base-300 rounded p-2 mt-1 text-sm">
                                        {ex.details}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            className="btn btn-error btn-lg self-end"
                            onClick={handleDelete}
                            title="Delete Workout"
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="ml-4 text-gray-400">No exercises recorded.</div>
                )}
            </div>
        </div>
    );
};

export default WorkoutListItem; 