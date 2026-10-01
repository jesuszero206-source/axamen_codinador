import { computed, Injectable, signal } from '@angular/core';
import { YugiohCard } from '../models/yugioh-card.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storageKey = 'duelist-favorite-cards';
  private readonly favorites = signal<YugiohCard[]>(this.readFavorites());

  readonly cards = this.favorites.asReadonly();
  readonly count = computed(() => this.favorites().length);

  isFavorite(cardId: number): boolean {
    return this.favorites().some((card) => card.id === cardId);
  }

  toggle(card: YugiohCard): void {
    const updated = this.isFavorite(card.id)
      ? this.favorites().filter((favorite) => favorite.id !== card.id)
      : [...this.favorites(), card];
    this.favorites.set(updated);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  private readFavorites(): YugiohCard[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? (JSON.parse(stored) as YugiohCard[]) : [];
    } catch {
      return [];
    }
  }
}
