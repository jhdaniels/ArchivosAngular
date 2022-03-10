import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; //new
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; //new
import { Post } from './post.model'; //new
import { ToastrService } from 'ngx-toastr'; //new
import { DataService } from './data.service'; //new

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  files: any; 
  submitted = false;
  data: any;
  form!: FormGroup;
  post = new Post();

  constructor(
    private toastr: ToastrService, 
    private formBuilder: FormBuilder, 
    private dataService: DataService){
  }


  createForm(){
    this.form = this.formBuilder.group({
      flArchivo: [null, Validators.required]
    })
  }

  ngOnInit(): void{
    this.createForm();

  }

  get formulario(){
    return this.form.controls;
     
  }

  uploadImage(event: any){
    this.files = event.target.files[0];
    console.log(this.files);
  }

  onSubmit(){                  //enviar archivo

    this.submitted = true;

    if(this.form.invalid){    //validadción de subir el archivo
      return;
    }

    const formData = new FormData();
    formData.append("archivo", this.files, this.files.name);
    
    this.dataService.uploadData(formData).subscribe(res =>{
      this.data = res;

      //notificación mensaje de exito o error
      if(this.data.status = true){
        this.toastr.success(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true
        })
      }else{
        this.toastr.error(JSON.stringify(this.data.message), '', {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.submitted = false;
      this.form.get('archivo')?.reset();
    });
  }  
}

