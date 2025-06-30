import { IoCloseSharp } from 'react-icons/io5';
import ContentArea from './ContentArea.jsx';

const EXERCISE_TYPES = [
  { value: '', label: 'Select type' },
  { value: 'weights', label: 'Weights' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'custom', label: 'Custom' },
];

const EXERCISE_NAMES = {
  weights: [
    '', 'Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Barbell Row', 'Pull Up', 'Other',
  ],
  cardio: [
    '', 'Running', 'Cycling', 'Rowing', 'Swimming', 'Other',
  ],
  custom: [
    '', 'Custom Exercise',
  ],
};

export default function Exercise({
  type,
  name,
  sets,
  details,
  onTypeChange,
  onNameChange,
  onSetChange,
  onAddSet,
  onRemoveSet,
  onDetailsChange,
  onAdd,
  showAddButton = false,
  disabled = false,
  onRemove,
}) {
  return (
    <div className="flex flex-col justify-start w-full gap-2 p-4 relative">
      <div className="flex flex-row justify-start w-full gap-4">
        <div className="form-control mb-2 w-1/2 flex flex-col gap-2">
          <label className="label border-b-2 border-gray-300 mb-2">
            <span className="label-text">Exercise Type</span>
          </label>
          <select
            className="select select-bordered w-full text-xl"
            value={type}
            onChange={onTypeChange}
            disabled={disabled}
          >
            {EXERCISE_TYPES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="form-control mb-2 w-1/2 flex flex-col gap-2">
          <label className="label border-b-2 border-gray-300 mb-2">
            <span className="label-text">Exercise Name</span>
          </label>
          <select
            className="select select-bordered w-full text-xl"
            value={name}
            onChange={onNameChange}
            disabled={!type || disabled}
          >
            {(EXERCISE_NAMES[type] || ['']).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      {type === 'weights' && name && (
        <div className="mb-2 flex flex-col items-center justify-start w-full gap-4">
          <label className="label self-start">
            {/* <span className="label-text">Sets</span> */}
          </label>
          {sets.map((set, idx) => (
            <div key={idx} className="flex gap-2 w-full mb-1 items-center">
              <span className="w-12 text-center font-bold text-xl">{idx + 1}</span>
              <input
                type="number"
                className="input input-bordered w-1/2 text-xl"
                placeholder="Weight"
                value={set.weight}
                onChange={e => onSetChange(idx, 'weight', e.target.value)}
                min="0"
                disabled={disabled}
              />
              <input
                type="number"
                className="input input-bordered w-1/2 text-xl"
                placeholder="Reps"
                value={set.reps}
                onChange={e => onSetChange(idx, 'reps', e.target.value)}
                min="0"
                disabled={disabled}
              />
              {sets.length > 1 && !disabled && (
                <button type="button" className="btn btn-md btn-error font-bold text-xl" onClick={() => onRemoveSet(idx)}>-</button>
              )}
            </div>
          ))}
          <div className="flex flex-row justify-center items-center w-full gap-4">
          {!disabled && (
            <button type="button" className="btn btn-info btn-outline text-xl p-6" onClick={onAddSet}>Add Set</button>
          )}
          {onRemove && !disabled && (
                <button
                type="button"
                className="btn btn-error btn-outline text-xl p-6"
                onClick={onRemove}
                >
                Delete Exercise
                </button>
            )}
          </div>
        </div>
      )}
      {(type === 'cardio' || type === 'custom') && name && (
        <div className="form-control mb-2 w-full">
          <label className="label border-b-2 border-gray-300 mb-2 w-full">
            <span className="label-text">Details</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full text-xl"
            placeholder="Enter details (duration, notes, etc.)"
            value={details}
            onChange={onDetailsChange}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
} 