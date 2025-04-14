import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CompletionResponseItem } from '../../interfaces/completion-response';
import { RouteResponse } from '../../interfaces/routes-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _apiEndpoint = 'https://timetable.search.ch/api';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  async completion(term: string): Promise<CompletionResponseItem[]> {
    const url = `https://timetable.search.ch/api/completion.fr.json?term=${term}`;
    return await firstValueFrom(this._http.get<CompletionResponseItem[]>(url));
  }

  async route(params: {
    from: string; to: string; date: string; time: string;
  }): Promise<RouteResponse> {
    const url = `${this._apiEndpoint}/route.fr.json?from=${params.from}&to=${params.to}&date=${params.date}&time=${params.time}&limit=1`
    const request = this._http.get<RouteResponse>(url);
    const response = await firstValueFrom(request);
    return response;
  }

}
