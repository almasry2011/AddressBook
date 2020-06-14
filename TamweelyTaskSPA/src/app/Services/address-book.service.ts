import { SearchModel } from './../Interfaces/search-model';
import { AddressBookModel } from './../Interfaces/address-book-model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private baseUrl: string = environment.apiUrl + 'AddressBook/';
  constructor(private http: HttpClient) { }

  GetAll(): Observable<AddressBookModel[]> {
    return this.http.get<any>(this.baseUrl + `GetAll`);
  }

  Search(model: SearchModel): Observable<AddressBookModel[]> {
    return this.http.post<any>(this.baseUrl + `Search`, model);
  }

  Create(model: AddressBookModel): Observable<AddressBookModel> {
    return this.http.post<any>(this.baseUrl + `Create`, model);
  }
  Update(model: AddressBookModel): Observable<AddressBookModel> {
    return this.http.put<AddressBookModel>(this.baseUrl + `Update`, model);
  }

  Delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Delete/${id}`);
  }


}
