import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserInfo } from '../../models/UserInfo';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  public loguearse(): void {
    let userInfo: UserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.login(userInfo).subscribe((token) => {
      this.recibirToken(token);
    }, error => this.manejarError(error));
  }

  public registrarse(): void {
    let userInfo: UserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.create(userInfo).subscribe((token) => {
      this.recibirToken(token);
    }, error => this.manejarError(error));
  }

  private recibirToken(token : any ): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate([""]);
  }

  private manejarError(error : any): void {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }
}
