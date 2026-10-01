import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, combineLatest, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { CardsViewModel, YugiohCard } from '../../core/models/yugioh-card.model';
import { YugiohService } from '../../core/services/yugioh.service';
import { Card } from '../../shared/card/card';
import { StateMessage } from '../../shared/state-message/state-message';

interface CollectionViewModel extends CardsViewModel {
  allCards: YugiohCard[];
  expansions: string[];
  selectedExpansion: string;
}

@Component({
  selector: 'app-blue-eyes',
  imports: [AsyncPipe, ReactiveFormsModule, Card, StateMessage],
  templateUrl: './blue-eyes.html',
  styleUrl: './blue-eyes.scss',
})
export class BlueEyes {
  private readonly yugiohService = inject(YugiohService);
  private readonly refresh$ = new Subject<boolean>();
  readonly expansionControl = new FormControl('all', { nonNullable: true });

  private readonly collection$ = this.refresh$.pipe(
    startWith(false),
    switchMap((forceRefresh) => this.loadCollection(forceRefresh)),
  );

  readonly vm$: Observable<CollectionViewModel> = combineLatest([
    this.collection$,
    this.expansionControl.valueChanges.pipe(startWith(this.expansionControl.value)),
  ]).pipe(
    map(([vm, selectedExpansion]) => {
      const cards = selectedExpansion === 'all'
        ? vm.cards
        : vm.cards.filter((card) => card.card_sets?.some((set) => set.set_name === selectedExpansion));
      return { ...vm, allCards: vm.cards, cards, selectedExpansion };
    }),
  );

  retry(): void { this.refresh$.next(true); }

  private loadCollection(forceRefresh: boolean): Observable<CollectionViewModel> {
    return this.yugiohService.getBlueEyesCards(forceRefresh).pipe(
      map((cards) => {
        const expansions = [...new Set(
          cards.flatMap((card) => card.card_sets?.map((set) => set.set_name) ?? []),
        )].sort((a, b) => a.localeCompare(b));
        return { state: cards.length ? 'success' : 'empty', cards, allCards: cards, expansions, selectedExpansion: 'all' } as CollectionViewModel;
      }),
      startWith({ state: 'loading', cards: [], allCards: [], expansions: [], selectedExpansion: 'all' } as CollectionViewModel),
      catchError((_error: HttpErrorResponse) => of<CollectionViewModel>({
        state: 'error', cards: [], allCards: [], expansions: [], selectedExpansion: 'all',
        message: 'No pudimos cargar la coleccion Blue-Eyes desde YGOPRODeck.',
      })),
    );
  }
}
