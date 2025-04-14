import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import { CompletionResponseItem } from '../../interfaces/completion-response';
import {
  IonContent, IonGrid, IonItem, IonLabel, IonList, IonInput, IonButton, IonCol, IonRow
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  imports: [
    CommonModule, FormsModule, IonContent, IonGrid, IonItem, IonLabel, IonList,
    IonInput, IonButton, IonCol, IonRow
  ],
})
export class SearchPageComponent {
  from = '';
  to = '';
  date = '';
  time = '';

  isFromFocused = false;
  isToFocused = false;

  private from$ = new BehaviorSubject<string>('');
  private to$ = new BehaviorSubject<string>('');

  fromSuggestions$!: Observable<CompletionResponseItem[]>;
  toSuggestions$!: Observable<CompletionResponseItem[]>;

  constructor(private api: ApiService, private router: Router) {
    this.fromSuggestions$ = this.from$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => from(this.api.completion(term)))
    );

    this.toSuggestions$ = this.to$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => from(this.api.completion(term)))
    );
  }

  onFromChange(value: string) {
    this.from = value;
    this.from$.next(value);
  }

  onToChange(value: string) {
    this.to = value;
    this.to$.next(value);
  }

  selectFromSuggestion(value: string) {
    this.from = value;
    this.from$.next(''); // vide les suggestions
  }

  selectToSuggestion(value: string) {
    this.to = value;
    this.to$.next('');
  }

  onFromBlur() {
    setTimeout(() => (this.isFromFocused = false), 200);
  }

  onToBlur() {
    setTimeout(() => (this.isToFocused = false), 200);
  }

  search() {
    console.log('Recherche lancée');
    this.router.navigate(['/result'], {
      queryParams: {
        from: this.from,
        to: this.to,
        date: this.date,
        time: this.time
      }
    });
  }
}
