import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressBookModel } from '../Interfaces/address-book-model';
import { DepartmentModel } from '../Interfaces/department-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private baseUrl: string = environment.apiUrl + 'Departments/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<DepartmentModel[]> {
    return this.http.get<any>(this.baseUrl + `GetDepartments/`);
  }

  Create(model: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<any>(this.baseUrl + `Create`, model);
  }
  Update(model: DepartmentModel): Observable<DepartmentModel> {
    return this.http.put<AddressBookModel>(this.baseUrl + `Update`, model);
  }

  Delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Delete/${id}`);
  }


}
