export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} €`
}

export const formatDiscount = (original: number, discountPercentage: number): number => {
  return +(original * (1 - discountPercentage / 100)).toFixed(2)
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const slugToLabel = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
