import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signedInId: number;
  loginForm: FormGroup;
  emailExist: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pass: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passPattern)]],
    });
  }

  login() {
    const formValue = this.loginForm.value;
    this.emailExists(formValue['email']).then((res) => {
      if (this.emailExist) {
        if (formValue['pass'] === res.password) {
          this.signedInId = res.idUser;
          
        }
        else {
          this.incorrectPass();
        }
      }
      else {
        this.accountDoesntExistAlert();
      }
    });
  }

  emailExists(email): any {
   
  }

  async accountDoesntExistAlert() {
    const alert = await this.alertController.create({
      message: 'There is no existing account with this email!',
      buttons: ['Try Again']
    });
    await alert.present();
  }

  async incorrectPass() {
    const alert = await this.alertController.create({
      message: 'Wrong password !',
      buttons: ['Try Again']
    });
    await alert.present();
  }
}
