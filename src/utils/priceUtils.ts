export const getPriceRangeText = (priceRange: string): string => {
  const priceMap: { [key: string]: string } = {
    'Free': 'Free',
    '$': '$0-25 per person',
    '$$': '$25-50 per person',
    '$$$': '$50-100 per person',
    '$$$$': '$100+ per person'
  }
  return priceMap[priceRange] || priceRange
}

export const getPriceRangeLabel = (priceRange: string): string => {
  const priceMap: { [key: string]: string } = {
    'Free': 'Free',
    '$': '$ ($0-25)',
    '$$': '$$ ($25-50)',
    '$$$': '$$$ ($50-100)',
    '$$$$': '$$$$ ($100+)'
  }
  return priceMap[priceRange] || priceRange
}

export const getTicketText = (requiresTicket: boolean): string => {
  return requiresTicket ? 'Tickets Required' : 'No Tickets Needed'
}

export const getTicketClass = (requiresTicket: boolean): string => {
  return requiresTicket 
    ? 'bg-blue-100 text-blue-700 border-blue-200'
    : 'bg-green-100 text-green-700 border-green-200'
} 