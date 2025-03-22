import { getPriceRangeLabel } from '../utils/priceUtils'

interface BudgetFilterProps {
  selectedBudgets: string[]
  onChange: (budgets: string[]) => void
}

export default function BudgetFilter({ selectedBudgets, onChange }: BudgetFilterProps) {
  const handleBudgetChange = (budget: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedBudgets, budget])
    } else {
      onChange(selectedBudgets.filter(b => b !== budget))
    }
  }

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Filter by budget:</span>
          <div className="flex gap-2 flex-wrap">
            {['Free', '$', '$$', '$$$', '$$$$'].map((option) => (
              <label
                key={option}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  selectedBudgets.includes(option)
                    ? 'bg-primary-100 text-primary-800 border-2 border-primary-500'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedBudgets.includes(option)}
                  onChange={(e) => handleBudgetChange(option, e.target.checked)}
                />
                {getPriceRangeLabel(option)}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 