import { DatePreferences } from '../App'
import { DateIdea } from '../data/dateIdeas'
import Ad from './Ad'

interface ResultsViewProps {
  preferences: DatePreferences
  onBack: () => void
  onRegenerate: () => void
  filteredIdeas: DateIdea[]
}

export default function ResultsView({ onBack, onRegenerate, filteredIdeas }: ResultsViewProps) {
  // Split suggestions into two groups for ad placement
  const firstGroup = filteredIdeas.slice(0, 3)
  const secondGroup = filteredIdeas.slice(3)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="btn btn-secondary">
          ← Back to Form
        </button>
        <button onClick={onRegenerate} className="btn btn-primary">
          Regenerate Suggestions
        </button>
      </div>

      {filteredIdeas.length === 0 ? (
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
  )
} 