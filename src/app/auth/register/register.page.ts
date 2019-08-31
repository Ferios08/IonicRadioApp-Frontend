import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  clientForm: FormGroup;
  emailExist: boolean;
  maxId: any;
  maxid: number;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";

  constructor(
    private formBuilder: FormBuilder, 
    private authServise: AuthService, 
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pass: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passPattern)]],
      passConf: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passPattern)]],
      birthday: ['', Validators.required],
      cin: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.clientForm.value;


  }



  emailExists(email): any {
  }

  async emailExistsAlert() {
    const alert = await this.alertController.create({
      message: 'There is an existing account with this email!',
      buttons: ['Try Again']
    });
    await alert.present();
  }

  async passMismatchAlert() {
    const alert = await this.alertController.create({
      message: 'Your password and confirmation password do not match!',
      buttons: ['Try Again']
    });
    await alert.present();
  }

  async passHelp() {
    const alert = await this.alertController.create({
      message: 'The password must contain a minimum of 6 characters: at least one uppercase letter, one lowercase letter and one number.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async signedUpSuccess() {
    const alert = await this.alertController.create({
      message: 'Account created successfully',
      buttons: ['Login']
    });
    await alert.present();
  }
}
