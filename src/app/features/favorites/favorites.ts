import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { Card } from '../../shared/card/card';
import { StateMessage } from '../../shared/state-message/state-message';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, Card, StateMessage],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  protected readonly favorites = inject(FavoritesService);
}
