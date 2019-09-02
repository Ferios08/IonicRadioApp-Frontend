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
  user: any = {
    'email': '',
    'password': ''
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      pass: ['', ],
      // [Validators.required, Validators.minLength(6), Validators.pattern(this.passPattern)]
    });
  }

  login() {
    const formValue = this.loginForm.value;
    this.user = {
      email : formValue.email,
      password: formValue.pass
    };
    console.log(this.user);
    try{
    this.AuthService.login(this.user).subscribe(res => {
      console.log(res);
      if (res) {
        this.router.navigate(['/home']);
      }
    }
      );
    }
    catch(error){
      console.log(error.HttpErrorResponse.error.error);
    }
  }




  onsubmit(){
    this.login()
  }

}
