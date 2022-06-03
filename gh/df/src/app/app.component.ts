import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';
interface Employee{
  fullname : string, emp_code : string, email :string,mobile:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'df';
  reqdata:any=[];
  constructor(private http: HttpClient,private empservice:EmployeeService) {
    this.empservice.getMethod().subscribe((response) => {
      this.setrecipes(response);
    })
  }
  emp:any=[];
  public id:number=0;
  public productname:string='';
  public rating:string='';
  public useremail:string='';
  public brand:string="";

  onSubmit(f:NgForm) {
    // console.log(f);
   const employee: Employee = {
      fullname: f.value.productName,
      emp_code:f.value.rating,
      email: f.value.usermail,
      mobile: f.value.brand,
    };
    console.log(employee)
  console.log("hello");
  this.http
    .post('http://127.0.0.1:8000/api/student/', employee)
    .subscribe((response) => {
      console.log(response);
    });
    this.empservice.getMethod().subscribe((response) => {
      this.setrecipes(response);
    });
console.log("hello");
    
  }
  onDelete(eleid:number) {
    const n:number = this.reqdata[eleid].id;
    this.http
      .delete('http://127.0.0.1:8000/api/student/'+n+'/')
      .subscribe((res) => {
        console.log(res);
      });
      this.empservice.getMethod().subscribe((response) => {
        console.log(response);
        this.setrecipes(response);
      });
  }
  setrecipes(recipe: any) {
    // const resultarray[] =[];
     const resultarray = Object.keys(recipe).map((index) => {
      let person = recipe[index];
      return person;
    });
    console.log(this.reqdata)
   //console.log(this.reqdata[0].productName) 
    this.reqdata = resultarray;
  }
  onEdit(eleid:number){
    this.id = this.reqdata[eleid].id;
    this.productname = this.reqdata[eleid].fullname;
    this.rating = this.reqdata[eleid].emp_code;
    this.useremail = this.reqdata[eleid].email;
    this.brand = this.reqdata[eleid].mobile;
    console.log(this.rating)
  }

  onUpdate(name:any,salary:any,emailid:any,brand:any) {
    const employee: Employee = {
      fullname: name.value,
      emp_code: emailid.value,
      mobile: salary.value,
      email:brand.value
    };
    this.http
      .put('http://127.0.0.1:8000/api/student/'+ this.id +'/', employee)
      .subscribe((res) => {
        console.log(res);
      });
      this.empservice.getMethod().subscribe((response) => {
        console.log(response);
        this.setrecipes(response);
      });
      
  }
}
