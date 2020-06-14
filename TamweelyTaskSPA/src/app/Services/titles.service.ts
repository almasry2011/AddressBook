import { TitlesModel } from './../Interfaces/titles-model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  private baseUrl: string = environment.apiUrl + 'Titles/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<TitlesModel[]> {
    return this.http.get<any>(this.baseUrl + `GetTitles/`);
  }
  Create(model: TitlesModel): Observable<TitlesModel> {
    return this.http.post<any>(this.baseUrl + `Create`, model);
  }
  Update(model: TitlesModel): Observable<TitlesModel> {
    return this.http.put<TitlesModel>(this.baseUrl + `Update`, model);
  }

  Delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Delete/${id}`);
  }

}
