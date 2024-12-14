/**
 * This interface is used for components that want to offer pagination
 * Note: pages indexes are 1-based!! so `isLastPage` means `currentPage === pagesCount`
 * and `isFirstPage` means `currentPage === 1`
 */
export interface Paginable {
  isFirstPage: boolean
  isLastPage: boolean
  pagesCount: number
  currentPage: number
  goToPage(index: number): void
  goToNextPage(): void
  goToPrevPage(): void
}
