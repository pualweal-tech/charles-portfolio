export const PORTFOLIO_SECTIONS = [
  { id: 'ui', label: 'UI设计' },
  { id: 'branding', label: '品牌策划' },
  { id: 'packaging', label: '包装设计' },
  { id: 'poster', label: '海报设计' },
  { id: 'book', label: '书籍设计' },
] as const

export type PortfolioSection = (typeof PORTFOLIO_SECTIONS)[number]['id']

export const DEFAULT_SECTION: PortfolioSection = 'branding'
