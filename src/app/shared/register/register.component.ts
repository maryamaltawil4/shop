import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../servers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [ ReactiveFormsModule ,CommonModule],
  providers:[AuthService ]
})
export class RegisterComponent {

  massageEmail:string =''; 
  loading:boolean=false;

  constructor( private _AuthService: AuthService , private _Router:Router){
  }

  registerData:FormGroup= new FormGroup({
    email:new FormControl(null , [Validators.required ]),
    userName: new FormControl(null,[Validators.required ,Validators.minLength(3)]),
    password:new FormControl(null,[Validators.required ,Validators.minLength(3)]),
    image:new FormControl(null,[Validators.required ]),
  });

  registerMethod(registerData: FormGroup) {

    this.loading=true;
    if (registerData.valid) {
      // I DO THAT TO HANDEL IMAGE FILE
      const formData = new FormData();
      formData.append('email', this.registerData.get('email')?.value);
      formData.append('userName', this.registerData.get('userName')?.value);
      formData.append('password', this.registerData.get('password')?.value);
      formData.append('image', this.registerData.get('image')?.value);
      this._AuthService.register(formData).subscribe({
        next: (data) => {if(data.message=="success") 
          this.loading=false ;
          this._Router.navigate(['/login']);
        },
        error: (err) => {if(err.status==409 ){
          this.massageEmail="Email already exists" ;
        } else{
          console.error('Registration error:', err)
        }this.loading=false ;
        }
      });
    }
  }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerData.patchValue({
        image: file
      });
    }
  }


}
