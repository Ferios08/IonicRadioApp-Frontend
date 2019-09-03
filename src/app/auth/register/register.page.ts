import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../user';
import { Storage } from '@ionic/storage';

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
  user: any = {
    name: '',
    email: '',
    password: ''
  };


  constructor(
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pass: ['',],
      passConf: ['',],
      // [Validators.required, Validators.minLength(6), Validators.pattern(this.passPattern)]
    });
  }

  onSubmitForm() {
    const formValue = this.clientForm.value;
    if (formValue['passConf'] === formValue['pass']) {
      this.signup();
    }
    else {
      this.passMismatchAlert();
      this.clientForm.controls['pass'].reset();
      this.clientForm.controls['passConf'].reset();
    }

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
  signup() {
    const formValue = this.clientForm.value;
    this.user = {
      name: formValue.firstName + ' ' + formValue.lastName,
      email: formValue.email,
      password: formValue.pass
    };
    this.authService.register(this.user).subscribe(res => {
      // console.log(res);
      if (res) {
        this.storage.set('name', this.user.name);
        this.router.navigate(['/home']);
      }
    }, err => {
      this.alert(err.error.error);
    }
    );
  }

  async alert(msg) {
    const alert = await this.alertController.create({
      header: msg,
      message: 'Please try again.',
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }
}
