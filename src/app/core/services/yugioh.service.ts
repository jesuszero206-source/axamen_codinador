import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { YugiohCard, YugiohResponse } from '../models/yugioh-card.model';

@Injectable({ providedIn: 'root' })
export class YugiohService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  private blueEyesCache$?: Observable<YugiohCard[]>;

  searchCards(term: string): Observable<YugiohCard[]> {
    return this.request(new HttpParams().set('fname', term));
  }

  getSuggestedCards(): Observable<YugiohCard[]> {
    const names = [
      'Blue-Eyes White Dragon',
      'Dark Magician',
      'Dark Magician Girl',
      'Red-Eyes Black Dragon',
      'Kuriboh',
      'Exodia the Forbidden One',
    ].join('|');
    return this.request(new HttpParams().set('name', names));
  }
  getCardById(id: number): Observable<YugiohCard> {
    return this.request(new HttpParams().set('id', id.toString())).pipe(map((cards) => cards[0]));
  }
  getBlueEyesCards(forceRefresh = false): Observable<YugiohCard[]> {
    if (!this.blueEyesCache$ || forceRefresh) {
      this.blueEyesCache$ = this.request(new HttpParams().set('archetype', 'Blue-Eyes')).pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.blueEyesCache$;
  }
  private request(params: HttpParams): Observable<YugiohCard[]> {
    return this.http.get<YugiohResponse>(this.endpoint, { params }).pipe(map((response) => response.data ?? []));
  }
}
