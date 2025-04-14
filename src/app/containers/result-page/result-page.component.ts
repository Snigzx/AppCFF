import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { RouteResponse } from '../../interfaces/routes-response';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonItem, IonLabel, IonList, IonButton, IonCol, IonRow, IonGrid
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-result-page',
  standalone: true,
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  imports: [CommonModule, IonItem, IonLabel, IonList],
})
export class ResultPageComponent {
  response$!: Observable<RouteResponse>;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.response$ = this.route.queryParams.pipe(
      switchMap(params => {
        console.log('✅ Reçu dans result-page :', params);
        return this.api.route({
          from: params['from'],
          to: params['to'],
          date: params['date'],
          time: params['time']
        });
      })
    );
  }
}


