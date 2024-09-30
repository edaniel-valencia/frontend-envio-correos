import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../services/error.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../services/config.service';
import { Config } from '../interfaces/config';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {



  listConfig: Config [] = []


  currentModalId: number | null = null;
  currentModalType: 'Create' | 'Update' | 'Read' | 'Delete' | null = null;


    //VARIABLE PARA LA PAGINACION
    totalItems: number = 0;
    itemsRegisterPage: number = 10;
    currentPage: number = 1 ;

    
    imageSelected: string | ArrayBuffer | null = null;
    file: File | null = null;
    form: FormGroup;
  constructor(
    private route: ActivatedRoute,  
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private _configService: ConfigService,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      secure: ['', Validators.required],
      auth: ['', Validators.required],
      pass: ['', Validators.required],
    });
   }

  
   ngOnInit(): void {
    this.listConfigAll();
  }

  listConfigAll(): void {
    this._configService.GetServerEmail().subscribe(data => {
      this.listConfig = data;
      console.log(data);
    });
  }


  
  CreateServidor(){

    if(this.form.invalid){
      this.toastr.error('No haz completado todo los datos', 'Alerta Campos Vacios')
      return
    }

    const config: Config = {
      Chost: this.form.value.host,
      Cport: this.form.value.port,
      Csecure: this.form.value.secure,
      Cauth: this.form.value.auth,
      Cpass: this.form.value.pass
    }

    console.log(config);
    

    this._configService.PostServerEmail(config).subscribe({
      next: (v) => {
        this.toastr.success("Creacion del servidor exitosamente", "Creación Exitosa")
        this.form.reset()
        this.listConfigAll()
        this.closeModal()
      },
      error: (e: HttpErrorResponse) =>{
        this._errorService.messageError(e)
      },
      complete: () => console.info('complete') 
    })

  }
  
  
  resetImage(): void {
    this.imageSelected = null;
    this.file = null;
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  openModal(modalId: number, modalType: 'Create' | 'Update' | 'Read' | 'Delete') {
    this.currentModalId = modalId,
      this.currentModalType = modalType;
  }

  isModalOpen(modalType: 'Create' | 'Update' | 'Read' | 'Delete') {
    return this.currentModalType === modalType;
  }

  closeModal() {
    this.currentModalId = null,
      this.currentModalType = null;
  }


  
  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}
