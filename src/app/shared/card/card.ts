import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YugiohCard } from '../../core/models/yugioh-card.model';
import { translateAttribute, translateCardType } from '../../core/models/card-translations';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly card = input.required<YugiohCard>();
  protected readonly favorites = inject(FavoritesService);
  protected readonly translateCardType = translateCardType;
  protected readonly translateAttribute = translateAttribute;

  toggleFavorite(): void { this.favorites.toggle(this.card()); }
}
