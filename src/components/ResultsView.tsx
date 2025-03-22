import { useState } from 'react'
import { DatePreferences } from '../App'
import { DateIdea } from '../data/dateIdeas'
import Ad from './Ad'
import BudgetFilter from './BudgetFilter'

interface ResultsViewProps {
  preferences: DatePreferences
  onBack: () => void
  filteredIdeas: DateIdea[]
}

export default function ResultsView({ onBack, filteredIdeas }: ResultsViewProps) {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])

  // Filter ideas by selected budgets
  const budgetFilteredIdeas = selectedBudgets.length === 0
    ? filteredIdeas // Show all ideas when no budgets are selected
    : filteredIdeas.filter(idea => selectedBudgets.includes(idea.cost))

  // Split suggestions into two groups for ad placement
  const firstGroup = budgetFilteredIdeas.slice(0, 3)
  const secondGroup = budgetFilteredIdeas.slice(3)

  return (
    <div className="space-y-8">
      <BudgetFilter
        selectedBudgets={selectedBudgets}
        onChange={setSelectedBudgets}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {budgetFilteredIdeas.length} Date {budgetFilteredIdeas.length === 1 ? 'Idea' : 'Ideas'} Found
          </h2>
          <button
            onClick={onBack}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back to Form
          </button>
        </div>

        {budgetFilteredIdeas.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">
              Try adjusting your preferences to find more date ideas.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* First group of suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firstGroup.map((idea) => (
                <div key={idea.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{idea.name}</h3>
                  <p className="text-gray-600 mb-4">{idea.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.cost}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.location}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.timeOfDay}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mid-suggestions ad */}
            <Ad slot="suggestions-mid" format="horizontal" className="w-full" />

            {/* Second group of suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondGroup.map((idea) => (
                <div key={idea.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{idea.name}</h3>
                  <p className="text-gray-600 mb-4">{idea.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.cost}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.location}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {idea.timeOfDay}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 