import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import RedirectLogic from './pages/RedirectLogic.jsx'
import ActiveWorkoutView from './pages/ActiveWorkoutView.jsx'
import WorkoutList from './pages/WorkoutList.jsx'
import AddWorkout from './pages/AddWorkout.jsx'

const App = () => {

  return (
    <div className="flex flex-col justify-start container mx-auto text-left">
        <Header />
        <Routes>
            <Route path="/" element={<RedirectLogic />} />
            <Route path="/active" element={<ActiveWorkoutView />} />
            <Route path="/history" element={<WorkoutList />} />
            <Route path="/new" element={<AddWorkout />} />
        </Routes>
    </div>
  )
}

export default App
