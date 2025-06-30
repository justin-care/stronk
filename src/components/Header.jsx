import { FaCirclePlus } from 'react-icons/fa6'
import { GiWeightLiftingUp } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom'
import { useWorkouts } from '../providers/provider.jsx'
import { useToast } from '../providers/ToastProvider.jsx'

const Header = () => {
    const navigate = useNavigate();
    const { workouts } = useWorkouts();
    const { warning, info } = useToast();
    const activeWorkout = workouts.find(workout => !workout.completed);

    const handleNewWorkout = () => {
        if (activeWorkout) {
            warning('You already have an active workout! Complete it first.', 4000);
            navigate('/active');
        } else {
            navigate('/new');
        }
    }

    return (
        <div className="flex w-full flex-row items-center justify-between h-16 bg-primary p-2">
            <button className="btn btn-ghost btn-lg text-4xl font-bold text-left flex flex-row items-center gap-2 px-2" onClick={() => navigate('/')}><GiWeightLiftingUp /> STRONK</button>
            <button className="btn btn-secondary font-bold text-lg btn-outline mr-2" onClick={handleNewWorkout}>
                New Workout 
                <FaCirclePlus />
            </button>
        </div>
    )
}

export default Header;