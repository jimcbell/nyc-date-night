import { useForm } from 'react-hook-form'
import { DatePreferences } from '../App'

const NEIGHBORHOODS = [
  'Manhattan - Upper East Side',
  'Manhattan - Upper West Side',
  'Manhattan - Midtown',
  'Manhattan - Lower East Side',
  'Manhattan - West Village',
  'Manhattan - East Village',
  'Brooklyn - Williamsburg',
  'Brooklyn - DUMBO',
  'Brooklyn - Park Slope',
]

const ACTIVITIES = [
  'Dining',
  'Culture',
  'Active',
  'Entertainment',
]

const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Kosher',
  'Halal',
]

interface DateFinderFormProps {
  onSubmit: (data: DatePreferences) => void
}

export default function DateFinderForm({ onSubmit }: DateFinderFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DatePreferences>({
    defaultValues: {
      budget: '',
      neighborhoods: [],
      date: '',
      timeOfDay: [],
      activities: [],
      accessibility: false,
      dietaryRestrictions: [],
      locationPreference: 'any'
    }
  })

  const timeOfDay = watch('timeOfDay')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Budget Section */}
      <div className="form-section">
        <h3 className="form-section-title">Budget Range</h3>
        <select
          id="budget"
          {...register('budget', { required: 'Budget is required' })}
          className="input"
        >
          <option value="">Select a budget range</option>
          <option value="$">$ (Under $50)</option>
          <option value="$$">$$ ($50-$100)</option>
          <option value="$$$">$$$ ($100-$200)</option>
          <option value="$$$$">$$$$ ($200+)</option>
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
        )}
      </div>

      {/* Neighborhood Section */}
      <div className="form-section">
        <h3 className="form-section-title">Neighborhood Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEIGHBORHOODS.map((neighborhood) => (
            <div key={neighborhood} className="flex items-center">
              <input
                type="checkbox"
                {...register('neighborhoods')}
                value={neighborhood}
                className="checkbox"
              />
              <label className="checkbox-label">
                {neighborhood}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Date and Time Section */}
      <div className="form-section">
        <h3 className="form-section-title">Date and Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              {...register('date', { required: 'Date is required' })}
              className="form-input"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Time of Day</label>
            <div className="grid grid-cols-2 gap-2">
              {['Morning', 'Noon', 'Afternoon', 'Evening', 'Late Night'].map((time) => (
                <label key={time} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('timeOfDay')}
                    value={time}
                    className="checkbox"
                  />
                  <span className="checkbox-label">{time}</span>
                </label>
              ))}
            </div>
            {(!timeOfDay || timeOfDay.length === 0) && (
              <p className="text-red-500 text-sm mt-1">Please select at least one time of day</p>
            )}
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="form-section">
        <h3 className="form-section-title">Activity Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACTIVITIES.map((activity) => (
            <div key={activity} className="flex items-center">
              <input
                type="checkbox"
                {...register('activities')}
                value={activity}
                className="checkbox"
              />
              <label className="checkbox-label">
                {activity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Considerations */}
      <div className="form-section">
        <h3 className="form-section-title">Special Considerations</h3>
        <div className="space-y-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('accessibility')}
              className="checkbox"
            />
            <label className="checkbox-label">
              Accessibility Required
            </label>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIETARY_RESTRICTIONS.map((restriction) => (
                <div key={restriction} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('dietaryRestrictions')}
                    value={restriction}
                    className="checkbox"
                  />
                  <label className="checkbox-label">
                    {restriction}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indoor/Outdoor Preference */}
      <div className="form-section">
        <h3 className="form-section-title">Location Preference</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('locationPreference')}
            value="indoor"
            className="checkbox"
          />
          <label className="checkbox-label">
            Indoor Only
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button type="submit" className="btn btn-primary w-full">
          Find Date Ideas
        </button>
      </div>
    </form>
  )
} 