import { useState } from 'react'
import { DatePreferences } from '../App'
import { DateIdea } from '../data/dateIdeas'
import { getPriceRangeText, getTicketText, getTicketClass } from '../utils/priceUtils'
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
    : filteredIdeas.filter(idea => selectedBudgets.includes(idea.priceRange))

  // Split suggestions into two groups for ad placement
  const firstGroup = budgetFilteredIdeas.slice(0, 3)
  const secondGroup = budgetFilteredIdeas.slice(3)

  const renderDateIdeaCard = (idea: DateIdea) => (
    <div key={idea.id} className="bg-white rounded-lg shadow-sm p-6 relative">
      {/* Ticket Indicator */}
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 rounded text-sm border ${getTicketClass(idea.requiresTicket)}`}>
          {getTicketText(idea.requiresTicket)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{idea.name}</h3>
      <p className="text-gray-600 mb-4">{idea.description}</p>
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          {getPriceRangeText(idea.priceRange)}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          {idea.neighborhood}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          {idea.activityType}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          {idea.timeOfDay.join(', ')}
        </span>
        {idea.accessibility.length > 0 && (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
            Accessible
          </span>
        )}
        {idea.dietaryOptions.length > 0 && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
            Dietary Options
          </span>
        )}
        {idea.weatherDependent && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
            Weather Dependent
          </span>
        )}
      </div>
      {idea.websiteUrl && (
        <div className="mt-4">
          <a 
            href={idea.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  )

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
              {firstGroup.map(renderDateIdeaCard)}
            </div>

            <Ad slot="suggestions-mid" format="horizontal" className="w-full" />

            {/* Second group of suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondGroup.map(renderDateIdeaCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 