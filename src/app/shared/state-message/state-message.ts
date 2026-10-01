import { Component, input, output } from '@angular/core';
import { RequestState } from '../../core/models/yugioh-card.model';

@Component({
  selector: 'app-state-message',
  templateUrl: './state-message.html',
  styleUrl: './state-message.scss',
})
export class StateMessage {
  readonly state = input.required<RequestState>();
  readonly title = input('');
  readonly message = input('');
  readonly retry = output<void>();
}
