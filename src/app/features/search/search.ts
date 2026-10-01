import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, combineLatest, debounceTime, distinctUntilChanged, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { CardsViewModel } from '../../core/models/yugioh-card.model';
import { YugiohService } from '../../core/services/yugioh.service';
import { Card } from '../../shared/card/card';
import { StateMessage } from '../../shared/state-message/state-message';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, ReactiveFormsModule, Card, StateMessage],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private readonly yugiohService = inject(YugiohService);
  private readonly retry$ = new Subject<void>();
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly sortControl = new FormControl('name', { nonNullable: true });
  readonly suggestedCards$ = this.yugiohService.getSuggestedCards().pipe(
    catchError(() => of([])),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  private readonly searchResult$: Observable<CardsViewModel> = combineLatest([
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map((term) => term.trim()),
      debounceTime(450),
      distinctUntilChanged(),
    ),
    this.retry$.pipe(startWith(undefined)),
  ]).pipe(switchMap(([term]) => this.search(term)));

  readonly vm$: Observable<CardsViewModel> = combineLatest([
    this.searchResult$,
    this.sortControl.valueChanges.pipe(startWith(this.sortControl.value)),
  ]).pipe(
    map(([vm, sort]) => ({ ...vm, cards: this.sortCards(vm.cards, sort) })),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  retry(): void { this.retry$.next(); }
  clear(): void { this.searchControl.setValue(''); }
  quickSearch(term: string): void { this.searchControl.setValue(term); }

  private search(term: string): Observable<CardsViewModel> {
    if (term.length < 2) return of({ state: 'idle', cards: [] });

    return this.yugiohService.searchCards(term).pipe(
      map((cards) => ({ state: cards.length ? 'success' : 'empty', cards }) as CardsViewModel),
      startWith({ state: 'loading', cards: [] } as CardsViewModel),
      catchError((error: HttpErrorResponse) =>
        of<CardsViewModel>(error.status === 400
          ? { state: 'empty', cards: [] }
          : { state: 'error', cards: [], message: 'No fue posible conectar con YGOPRODeck. Revisa tu conexión e intenta nuevamente.' }),
      ),
    );
  }

  private sortCards(cards: CardsViewModel['cards'], sort: string): CardsViewModel['cards'] {
    return [...cards].sort((a, b) => {
      if (sort === 'atk') return (b.atk ?? -1) - (a.atk ?? -1);
      if (sort === 'level') return (b.level ?? -1) - (a.level ?? -1);
      return a.name.localeCompare(b.name);
    });
  }
}
