export type { CategoryLeaf, CategoryGroup } from './categoryTypes'
import type { CategoryGroup } from './categoryTypes'

export const API_BASE_URL = 'https://dummyjson.com' as const

// Number of products fetched from the API per request
export const PRODUCTS_PER_PAGE = 100

// Number of products displayed per page in the UI
export const PRODUCTS_PAGE_SIZE = 20

export const DEBOUNCE_DELAY_MS = 350

export const CATEGORY_HIERARCHY: CategoryGroup[] = [
  {
    label: 'Beauty & Care',
    id: 'beauty',
    children: [
      { label: 'Beauty', slug: 'beauty' },
      { label: 'Fragrances', slug: 'fragrances' },
      { label: 'Skin Care', slug: 'skin-care' },
    ],
  },
  {
    label: 'Electronics',
    id: 'electronics',
    children: [
      { label: 'Laptops', slug: 'laptops' },
      { label: 'Smartphones', slug: 'smartphones' },
      { label: 'Tablets', slug: 'tablets' },
      { label: 'Mobile Accessories', slug: 'mobile-accessories' },
    ],
  },
  {
    label: 'Fashion',
    id: 'fashion',
    children: [
      {
        label: 'Clothing',
        slug: 'tops',
        children: [
          { label: 'Tops', slug: 'tops' },
          { label: "Women's Dresses", slug: 'womens-dresses' },
          { label: "Men's Shirts", slug: 'mens-shirts' },
        ],
      },
      {
        label: 'Shoes',
        slug: 'mens-shoes',
        children: [
          { label: "Men's Shoes", slug: 'mens-shoes' },
          { label: "Women's Shoes", slug: 'womens-shoes' },
        ],
      },
      {
        label: 'Accessories',
        slug: 'womens-bags',
        children: [
          { label: 'Bags', slug: 'womens-bags' },
          { label: 'Jewellery', slug: 'womens-jewellery' },
          { label: 'Sunglasses', slug: 'sunglasses' },
          { label: "Men's Watches", slug: 'mens-watches' },
          { label: "Women's Watches", slug: 'womens-watches' },
        ],
      },
    ],
  },
  {
    label: 'Home & Garden',
    id: 'home',
    children: [
      { label: 'Furniture', slug: 'furniture' },
      { label: 'Home Decoration', slug: 'home-decoration' },
      { label: 'Kitchen', slug: 'kitchen-accessories' },
    ],
  },
  {
    label: 'Sports',
    id: 'sports',
    children: [{ label: 'Sports Accessories', slug: 'sports-accessories' }],
  },
]

// Categories excluded from "all products" view (removed from sidebar too)
export const EXCLUDED_CATEGORIES = new Set(['vehicle', 'groceries'])

// Gender / demographic tabs — separate from sidebar category tree
export const GENDER_TABS = [
  { label: 'Women', category: 'womens-dresses' },
  { label: 'Men', category: 'mens-shirts' },
  { label: 'Unisex', category: 'tops' },
  { label: 'Children', category: 'sports-accessories' },
  { label: 'New', category: '' },
] as const
