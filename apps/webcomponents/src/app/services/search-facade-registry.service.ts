import { Injectable, inject } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'

/**
 * Service to manage shared SearchFacade instances across webcomponents
 * to prevent duplicate initialization errors and ensure state sharing
 */
@Injectable({
  providedIn: 'root'
})
export class SearchFacadeRegistry {
  private sharedFacade: SearchFacade | null = null
  private currentSearchId: string | null = null

  /**
   * Initialize or get the shared SearchFacade instance
   */
  initializeOrGetFacade(facade: SearchFacade, searchId?: string): SearchFacade {
    const id = searchId || 'default'

    if (!this.sharedFacade) {
      this.sharedFacade = facade
      this.currentSearchId = id
      try {
        this.sharedFacade.init(id)
      } catch (error) {
        // Already initialized, which is fine
      }
    } else if (this.currentSearchId !== id) {
      // Different searchId - we need to reinitialize
    }

    return this.sharedFacade
  }

  /**
   * Check if the registry has a shared facade
   */
  hasSharedFacade(): boolean {
    return this.sharedFacade !== null
  }

  /**
   * Get the current search ID
   */
  getCurrentSearchId(): string | null {
    return this.currentSearchId
  }

  /**
   * Reset the registry (for testing)
   */
  reset(): void {
    this.sharedFacade = null
    this.currentSearchId = null
  }
}
