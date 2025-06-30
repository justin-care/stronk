import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../providers/provider';

function RedirectLogic() {
  const navigate = useNavigate();
  const { workouts, loading } = useWorkouts();

  useEffect(() => { 
    // Don't make routing decisions while still loading
    if (loading) {
      return;
    }
    
    console.log(workouts);
    //deleteAllWorkouts();
    const active = workouts.find(w => !w.completed);
    if( workouts.length === 0 ) {
      navigate('/new', { replace: true });
    } else if (active) {
      navigate('/active', { replace: true });
    } else {
      navigate('/history', { replace: true });
    }
  }, [workouts, loading, navigate]);

  return null;
}

export default RedirectLogic;
