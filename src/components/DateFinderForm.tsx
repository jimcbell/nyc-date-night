import { useState, useEffect } from 'react'
import { DatePreferences } from '../App'
import { dateIdeas } from '../data/dateIdeas'
import { MapPinIcon, SunIcon, MoonIcon, ClockIcon, BeakerIcon, PaintBrushIcon, UserGroupIcon, TicketIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import '../styles/custom.css'

interface FormErrors {
  neighborhoods?: string
  timeOfDay?: string
  activities?: string
}

interface DateFinderFormProps {
  onSubmit: (data: DatePreferences) => void
  initialPreferences?: DatePreferences | null
}

export default function DateFinderForm({ onSubmit, initialPreferences }: DateFinderFormProps) {
  const [formData, setFormData] = useState<DatePreferences>({
    budget: [],
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

      return dateIdeas.some(idea => {
        const neighborhoodMatch = formData.neighborhoods.length === 0 || 
          formData.neighborhoods.some(neighborhood => 
            idea.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
          )
        
        const timeMatch = formData.timeOfDay.length === 0 || 
          formData.timeOfDay.some(time => {
            if (time.toLowerCase() === 'any') return true
            return idea.timeOfDay.some(ideaTime => ideaTime.toLowerCase() === time.toLowerCase())
          })

        const activityTypeMatch = activityMap[activity]?.includes(idea.activityType)

        return neighborhoodMatch && timeMatch && activityTypeMatch
      })
    })

    setAvailableActivities(available)
  }

  useEffect(() => {
    checkAvailableActivities()
  }, [formData.neighborhoods, formData.timeOfDay])

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

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (formData.neighborhoods.length === 0) {
      newErrors.neighborhoods = 'Please select at least one neighborhood'
    }

    if (formData.timeOfDay.length === 0) {
      newErrors.timeOfDay = 'Please select at least one time of day'
    }
    
    if (formData.activities.length === 0) {
      newErrors.activities = 'Please select at least one activity type'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with wave pattern */}
      <div className="header-wave">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center mb-2">Find Your Perfect Date Night</h1>
          <p className="text-white text-center text-lg">Discover NYC's best experiences tailored to your preferences</p>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="decorative-circles">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>
      </div>

      {/* Main form card */}
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="form-card">
          {/* Neighborhoods Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-teal-500" />
              Neighborhoods
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map((neighborhood) => (
                <label key={neighborhood} className={`option-button ${
                  formData.neighborhoods.includes(neighborhood)
                    ? 'option-button--selected'
                    : 'option-button--unselected'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.neighborhoods.includes(neighborhood)}
                    onChange={(e) => handleNeighborhoodChange(neighborhood, e.target.checked)}
                    className="sr-only"
                  />
                  <MapPinIcon className="option-icon" />
                  <span>{neighborhood}</span>
                </label>
              ))}
            </div>
            {errors.neighborhoods && <p className="mt-2 text-sm text-red-600">{errors.neighborhoods}</p>}
          </div>

          {/* Time of Day Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-teal-500" />
              Time of Day
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Daytime', icon: SunIcon },
                { label: 'Nighttime', icon: MoonIcon },
                { label: 'Any', icon: ClockIcon }
              ].map(({ label, icon: Icon }) => (
                <label key={label} className={`option-button ${
                  formData.timeOfDay.includes(label)
                    ? 'option-button--selected'
                    : 'option-button--unselected'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.timeOfDay.includes(label)}
                    onChange={(e) => handleTimeOfDayChange(label, e.target.checked)}
                    className="sr-only"
                  />
                  <Icon className="option-icon" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.timeOfDay && <p className="mt-2 text-sm text-red-600">{errors.timeOfDay}</p>}
          </div>

          {/* Activities Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <TicketIcon className="w-5 h-5 mr-2 text-teal-500" />
              Activities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {[
                { label: 'Food & Drink', icon: BeakerIcon },
                { label: 'Arts & Culture', icon: PaintBrushIcon },
                { label: 'Outdoor & Sports', icon: UserGroupIcon },
                { label: 'Entertainment', icon: TicketIcon }
              ].map(({ label, icon: Icon }) => {
                const isAvailable = availableActivities.includes(label)
                return (
                  <label 
                    key={label} 
                    className={`option-button ${
                      !isAvailable 
                        ? 'option-button--disabled'
                        : formData.activities.includes(label)
                          ? 'option-button--selected'
                          : 'option-button--unselected'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(label)}
                      onChange={(e) => handleActivityChange(label, e.target.checked)}
                      disabled={!isAvailable}
                      className="sr-only"
                    />
                    <Icon className="option-icon" />
                    <span>{label}</span>
                  </label>
                )
              })}
            </div>
            {errors.activities && <p className="mt-2 text-sm text-red-600">{errors.activities}</p>}
          </div>

          {/* Accessibility Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-teal-500" />
              Accessibility
            </h3>
            <label className={`option-button ${
              formData.accessibility
                ? 'option-button--selected'
                : 'option-button--unselected'
            }`}>
              <input
                type="checkbox"
                checked={formData.accessibility}
                onChange={(e) => handleChange('accessibility', e.target.checked)}
                className="sr-only"
              />
              <UserIcon className="option-icon" />
              <span>Wheelchair Accessible</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="cta-button">
            <MagnifyingGlassIcon className="w-6 h-6" />
            Find Date Ideas
          </button>
        </form>
      </div>
    </div>
  )
} 