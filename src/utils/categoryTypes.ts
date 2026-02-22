export interface CategoryLeaf {
  label: string
  slug: string
  children?: CategoryLeaf[]
}

export interface CategoryGroup {
  label: string
  id: string
  children: CategoryLeaf[]
}
