import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getMethod(){
    return this.http
       .get('http://127.0.0.1:8000/api/student/')
   }
}
