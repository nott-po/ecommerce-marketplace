export type ItemStatus = 'In Sale' | 'In Progress' | 'Locked' | 'Reserved' | 'Sold' | 'Closed Out'

// mock status based on product id — weighted toward Closed Out
export const STATUS_CYCLE: ItemStatus[] = [
  'In Sale',
  'In Progress',
  'Locked',
  'Reserved',
  'Sold',
  'Closed Out',
  'Closed Out',
  'Closed Out',
  'Closed Out',
  'Closed Out',
]

export interface BackofficeItem {
  id: number
  name: string
  thumbnail: string
  items: number
  category: string
  subcategory: string
  storage: string
  status: ItemStatus
}

export interface AddItemForm {
  title: string
  description: string
  price: number
  category: string
  stock: number
}
