import { useState } from 'react'
import DateFinderForm from './components/DateFinderForm'
import ResultsView from './components/ResultsView'
import Ad from './components/Ad'
import { dateIdeas, DateIdea } from './data/dateIdeas'

export interface DatePreferences {
  budget: string
  neighborhoods: string[]
  timeOfDay: string[]
  activities: string[]
  accessibility: boolean
  dietaryRestrictions: string[]
}

function App() {
  const [showResults, setShowResults] = useState(false)
  const [preferences, setPreferences] = useState<DatePreferences | null>(null)
  const [key, setKey] = useState(0)

  const handleSubmit = (data: DatePreferences) => {
    setPreferences(data)
    setShowResults(true)
  }

  const handleRegenerate = () => {
    setKey(prev => prev + 1)
  }

  const filterDateIdeas = (preferences: DatePreferences): DateIdea[] => {
    return dateIdeas.filter(idea => {
      // Budget filter - allow matching or lower budget
      const budgetLevels = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
      const ideaBudgetLevel = budgetLevels[idea.cost as keyof typeof budgetLevels]
      const preferenceBudgetLevel = budgetLevels[preferences.budget as keyof typeof budgetLevels]
      const budgetMatch = ideaBudgetLevel <= preferenceBudgetLevel

      // Neighborhood filter - match if idea's location contains any selected neighborhood
      const neighborhoodMatch = preferences.neighborhoods.some(neighborhood => 
        idea.location.toLowerCase().includes(neighborhood.toLowerCase())
      )

      // Time of day filter - match if idea's time matches any selected time
      const timeMatch = preferences.timeOfDay.some(time => {
        // If user selected "Any", match any time of day
        if (time.toLowerCase() === 'any') {
          return true;
        }
        // If idea is marked as "Any", it matches any user preference
        if (idea.timeOfDay.toLowerCase() === 'any') {
          return true;
        }
        // Otherwise, match exact time
        return idea.timeOfDay.toLowerCase() === time.toLowerCase();
      })

      // Activity type filter - match if idea's type matches any selected activity
      const activityMatch = preferences.activities.some(activity => {
        // Map form activities to idea types
        const activityMap: { [key: string]: string[] } = {
          'Food & Drink': ['Dining'],
          'Arts & Culture': ['Culture'],
          'Outdoor & Sports': ['Active'],
          'Entertainment': ['Entertainment']
        }
        return activityMap[activity]?.includes(idea.type) || false
      })

      // Accessibility filter - only apply if accessibility is required
      const accessibilityMatch = !preferences.accessibility || idea.accessibility

      // Dietary restrictions filter - only apply if food/drink is selected and restrictions are specified
      const dietaryMatch = !preferences.activities.includes('Food & Drink') || 
        preferences.dietaryRestrictions.length === 0 ||
        preferences.dietaryRestrictions.some(restriction => 
          idea.dietaryOptions.includes(restriction)
        )

      // Return true if all filters pass
      return budgetMatch && 
        neighborhoodMatch && 
        timeMatch && 
        activityMatch && 
        accessibilityMatch && 
        dietaryMatch
    })
  }

  const filteredIdeas = preferences ? filterDateIdeas(preferences) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NYC Date Night Finder</h1>
              <p className="mt-1 text-sm text-gray-500">
                Discover the perfect date night in New York City
              </p>
            </div>
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Header Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Ad slot="header-banner" format="horizontal" className="w-full" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Find Your Perfect Date Night
                </h2>
                <DateFinderForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex-1">
              <ResultsView 
                key={key}
                preferences={preferences!} 
                onBack={() => setShowResults(false)}
                onRegenerate={handleRegenerate}
                filteredIdeas={filteredIdeas}
              />
            </div>
            {/* Sidebar Ad (Desktop Only) */}
            <div className="hidden lg:block w-72">
              <Ad slot="sidebar" format="vertical" className="sticky top-8" />
            </div>
          </div>
        )}
      </main>

      {/* Footer Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Ad slot="footer-banner" format="horizontal" className="w-full" />
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 NYC Date Night Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 