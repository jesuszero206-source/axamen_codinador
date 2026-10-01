import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, combineLatest, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { RequestState, YugiohCard } from '../../core/models/yugioh-card.model';
import { translateAttribute, translateCardType, translateRace } from '../../core/models/card-translations';
import { FavoritesService } from '../../core/services/favorites.service';
import { YugiohService } from '../../core/services/yugioh.service';
import { StateMessage } from '../../shared/state-message/state-message';

interface CardDetailViewModel { state: RequestState; card?: YugiohCard; message?: string; }

@Component({
  selector: 'app-card-detail',
  imports: [AsyncPipe, DecimalPipe, RouterLink, StateMessage],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss',
})
export class CardDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly yugiohService = inject(YugiohService);
  private readonly retry$ = new Subject<void>();
  protected readonly favorites = inject(FavoritesService);
  protected readonly translateCardType = translateCardType;
  protected readonly translateAttribute = translateAttribute;
  protected readonly translateRace = translateRace;
  readonly vm$: Observable<CardDetailViewModel> = combineLatest([
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    this.retry$.pipe(startWith(undefined)),
  ]).pipe(switchMap(([id]) => this.loadCard(id)));

  retry(): void { this.retry$.next(); }
  toggleFavorite(card: YugiohCard): void { this.favorites.toggle(card); }

  private loadCard(id: number): Observable<CardDetailViewModel> {
    if (!Number.isInteger(id) || id <= 0) return of({ state: 'error', message: 'El identificador de la carta no es valido.' });
    return this.yugiohService.getCardById(id).pipe(
      map((card) => ({ state: card ? 'success' : 'empty', card }) as CardDetailViewModel),
      startWith({ state: 'loading' } as CardDetailViewModel),
      catchError((_error: HttpErrorResponse) => of<CardDetailViewModel>({ state: 'error', message: 'No fue posible obtener el detalle de esta carta.' })),
    );
  }
}
