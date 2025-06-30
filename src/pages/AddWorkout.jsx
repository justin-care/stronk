import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentArea from '../components/ContentArea.jsx'
import { useWorkouts } from '../providers/provider.jsx';
import { useToast } from '../providers/ToastProvider.jsx';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
    const [name, setName] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [uuid, setUUID] = useState('');
    const { addWorkout, workouts } = useWorkouts();
    const { warning, success } = useToast();
    const mockUUID = '44521c15-699e-41f1-801f-e19fc952b91b'
    const navigate = useNavigate();

    // Check if there's an active workout
    const activeWorkout = workouts.find(w => w.completed === false);

    useEffect(() => {
        setTimestamp(new Date().toISOString());
        setUUID(uuidv4());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (activeWorkout) {
            warning('You already have an active workout! Please complete it first.', 5000);
            return;
        }

        await addWorkout({
            id: uuid,
            name,
            date: timestamp,
            userId: mockUUID,
            completed: false,
            exercises: []
        });
        setName('');
        setTimestamp(new Date().toISOString());
        setUUID(uuidv4());
        success('New workout created! Let\'s get started! 🏋️', 3000);
        navigate('/active');
    };

    const children = (
        <div className="flex flex-col justify-start h-full w-full">
            <h1 className="mb-4">Create New Workout</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <label className="form-control">
                    <span className="label-text">Workout Name</span>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary mt-2">Create Workout</button>
            </form>
        </div>
    )

    return (
        <ContentArea children={children} />
    )
}

export default AddWorkout;