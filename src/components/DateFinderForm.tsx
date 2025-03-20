import { useState, useEffect } from 'react'
import { DatePreferences } from '../App'
import { dateIdeas } from '../data/dateIdeas'

interface FormErrors {
  budget?: string
  neighborhoods?: string
  timeOfDay?: string
  activities?: string
  dietaryRestrictions?: string
}

interface DateFinderFormProps {
  onSubmit: (data: DatePreferences) => void
  initialPreferences?: DatePreferences | null
}

export default function DateFinderForm({ onSubmit, initialPreferences }: DateFinderFormProps) {
  const [formData, setFormData] = useState<DatePreferences>({
    budget: initialPreferences?.budget || [],
    neighborhoods: initialPreferences?.neighborhoods || [],
    timeOfDay: initialPreferences?.timeOfDay || [],
    activities: initialPreferences?.activities || [],
    accessibility: initialPreferences?.accessibility || false,
    dietaryRestrictions: initialPreferences?.dietaryRestrictions || []
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [availableActivities, setAvailableActivities] = useState<string[]>(['Food & Drink', 'Arts & Culture', 'Outdoor & Sports', 'Entertainment'])

  // Update form data when initialPreferences changes
  useEffect(() => {
    if (initialPreferences) {
      setFormData(initialPreferences)
    }
  }, [initialPreferences])

  const checkAvailableActivities = () => {
    const available = ['Food & Drink', 'Arts & Culture', 'Outdoor & Sports', 'Entertainment'].filter(activity => {
      // Map form activities to idea types
      const activityMap: { [key: string]: string[] } = {
        'Food & Drink': ['Dining'],
        'Arts & Culture': ['Culture'],
        'Outdoor & Sports': ['Active'],
        'Entertainment': ['Entertainment']
      }

      // Check if any ideas match the current filters for this activity type
      return dateIdeas.some(idea => {
        // Budget match
        const budgetMatch = formData.budget.length === 0 || formData.budget.includes(idea.cost)
        
        // Neighborhood match
        const neighborhoodMatch = formData.neighborhoods.length === 0 || 
          formData.neighborhoods.some(neighborhood => 
            idea.location.toLowerCase().includes(neighborhood.toLowerCase())
          )
        
        // Time of day match
        const timeMatch = formData.timeOfDay.length === 0 || formData.timeOfDay.some(time => {
          if (time.toLowerCase() === 'any') return true
          if (idea.timeOfDay.toLowerCase() === 'any') return true
          return idea.timeOfDay.toLowerCase() === time.toLowerCase()
        })

        // Activity type match
        const activityTypeMatch = activityMap[activity]?.includes(idea.type)

        return budgetMatch && neighborhoodMatch && timeMatch && activityTypeMatch
      })
    })

    setAvailableActivities(available)
  }

  useEffect(() => {
    checkAvailableActivities()
  }, [formData.budget, formData.neighborhoods, formData.timeOfDay])

  const handleChange = (field: keyof DatePreferences, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNeighborhoodChange = (neighborhood: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      neighborhoods: checked 
        ? [...prev.neighborhoods, neighborhood]
        : prev.neighborhoods.filter(n => n !== neighborhood)
    }))
  }

  const handleTimeOfDayChange = (time: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      timeOfDay: checked
        ? [...prev.timeOfDay, time]
        : prev.timeOfDay.filter(t => t !== time)
    }))
  }

  const handleActivityChange = (activity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      activities: checked
        ? [...prev.activities, activity]
        : prev.activities.filter(a => a !== activity)
    }))
  }

  const handleDietaryChange = (restriction: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter(r => r !== restriction)
    }))
  }

  const handleBudgetChange = (budget: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      budget: checked
        ? [...prev.budget, budget]
        : prev.budget.filter(b => b !== budget)
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (formData.budget.length === 0) {
      newErrors.budget = 'Please select at least one budget option'
    }
    
    if (formData.neighborhoods.length === 0) {
      newErrors.neighborhoods = 'Please select at least one neighborhood'
    }

    if (formData.timeOfDay.length === 0) {
      newErrors.timeOfDay = 'Please select at least one time of day'
    }
    
    if (formData.activities.length === 0) {
      newErrors.activities = 'Please select at least one activity type'
    }
    
    if (formData.dietaryRestrictions.length > 0 && formData.activities.includes('Food & Drink')) {
      newErrors.dietaryRestrictions = 'Please select at least one dietary option'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Budget Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Budget</h3>
        <div className="grid grid-cols-2 gap-4">
          {['$', '$$', '$$$', '$$$$'].map((option) => (
            <label key={option} className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.budget.includes(option)
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.budget.includes(option)}
                onChange={(e) => handleBudgetChange(option, e.target.checked)}
                className="sr-only"
              />
              <span className="text-lg font-medium">{option}</span>
            </label>
          ))}
        </div>
        {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
      </div>

      {/* Neighborhoods Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Neighborhoods</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map((neighborhood) => (
            <label key={neighborhood} className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.neighborhoods.includes(neighborhood)
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.neighborhoods.includes(neighborhood)}
                onChange={(e) => handleNeighborhoodChange(neighborhood, e.target.checked)}
                className="sr-only"
              />
              <span>{neighborhood}</span>
            </label>
          ))}
        </div>
        {errors.neighborhoods && <p className="mt-1 text-sm text-red-600">{errors.neighborhoods}</p>}
      </div>

      {/* Time of Day Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Time of Day</h3>
        <div className="grid grid-cols-2 gap-4">
          {['Daytime', 'Nighttime', 'Any'].map((time) => (
            <label key={time} className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.timeOfDay.includes(time)
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.timeOfDay.includes(time)}
                onChange={(e) => handleTimeOfDayChange(time, e.target.checked)}
                className="sr-only"
              />
              <span>{time}</span>
            </label>
          ))}
        </div>
        {errors.timeOfDay && <p className="mt-1 text-sm text-red-600">{errors.timeOfDay}</p>}
      </div>

      {/* Activities Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['Food & Drink', 'Arts & Culture', 'Outdoor & Sports', 'Entertainment'].map((activity) => {
            const isAvailable = availableActivities.includes(activity)
            return (
              <label 
                key={activity} 
                className={`relative flex items-center p-4 border rounded-lg transition-colors ${
                  !isAvailable 
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    : formData.activities.includes(activity)
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.activities.includes(activity)}
                  onChange={(e) => handleActivityChange(activity, e.target.checked)}
                  disabled={!isAvailable}
                  className="sr-only"
                />
                <span>{activity}</span>
              </label>
            )
          })}
        </div>
        {errors.activities && <p className="mt-1 text-sm text-red-600">{errors.activities}</p>}
      </div>

      {/* Accessibility Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility</h3>
        <label className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
          formData.accessibility
            ? 'bg-primary-50 border-primary-500 text-primary-700'
            : 'hover:bg-gray-50'
        }`}>
          <input
            type="checkbox"
            checked={formData.accessibility}
            onChange={(e) => handleChange('accessibility', e.target.checked)}
            className="sr-only"
          />
          <span>Wheelchair Accessible</span>
        </label>
      </div>

      {/* Dietary Restrictions Section */}
      {formData.activities.includes('Food & Drink') && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Dietary Restrictions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'].map((restriction) => (
              <label key={restriction} className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.dietaryRestrictions.includes(restriction)
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'hover:bg-gray-50'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.dietaryRestrictions.includes(restriction)}
                  onChange={(e) => handleDietaryChange(restriction, e.target.checked)}
                  className="sr-only"
                />
                <span>{restriction}</span>
              </label>
            ))}
          </div>
          {errors.dietaryRestrictions && <p className="mt-1 text-sm text-red-600">{errors.dietaryRestrictions}</p>}
        </div>
      )}

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Find Date Ideas
        </button>
      </div>
    </form>
  )
} 