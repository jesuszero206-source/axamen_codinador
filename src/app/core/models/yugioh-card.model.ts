export interface YugiohResponse { data: YugiohCard[]; }
export interface YugiohCard {
  id: number; name: string; type: string; frameType: string; desc: string; race: string;
  archetype?: string; attribute?: string; level?: number; atk?: number; def?: number;
  card_images: CardImage[]; card_sets?: CardSet[];
}
export interface CardImage { id: number; image_url: string; image_url_small: string; image_url_cropped: string; }
export interface CardSet { set_name: string; set_code: string; set_rarity: string; set_rarity_code?: string; set_price: string; }
export type RequestState = 'idle' | 'loading' | 'success' | 'empty' | 'error';
export interface CardsViewModel { state: RequestState; cards: YugiohCard[]; message?: string; }
