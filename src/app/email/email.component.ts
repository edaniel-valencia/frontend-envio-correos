import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Email } from '../interfaces/email';
import { EmailService } from '../services/email.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-email',
  standalone: true,  // Especifica que es un componente standalone
  imports: [ReactiveFormsModule],  // Asegúrate de que HttpClientModule está en imports
  providers: [EmailService],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {

  name?: string
  lastname?: string
  email?: string
  whatsapp?: string
  subject?: string
  message?: string

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _emailService: EmailService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      whatsapp: ['', Validators.required],
      subject: ['', Validators.required],
      message: [''],
    })
  }

  SendEmail(){

    if(this.form.invalid){
      this.toastr.error('No haz completado todo los datos', 'Alerta Campos Vacios')
      return
    }

    const email: Email = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      whatsapp: this.form.value.whatsapp,
      subject: this.form.value.subject,
      message: this.form.value.message
    }

    this._emailService.SendEmail(email).subscribe({
      next: (v) => {
        this.toastr.success("Correo enviado exitosamente", "Correo Enviado")
        this.form.reset()
      },
      error: (e: HttpErrorResponse) =>{
        this._errorService.messageError(e)
      },
      complete: () => console.info('complete') 
    })

  }
}
