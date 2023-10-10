import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  autoMakers: string[] = [
    'Toyota', 'Innoson', 'Mercedes', 'Tesla', 'Lexus', 'Ferrari', 'Ford', 'MClaren', 'Maybach', 'Porsche'
  ];
  autoModels: { [key: string]: string[] }[] = [
    { 'Toyota': ['GR Supra', 'RAV 4', 'PRIUS', 'TACOMA', 'MIRAI'] },
    { 'Mercedes': ['EQE', 'EQS-SUV', 'GLE Coupe', 'V-Class', 'EQS'] },
    { 'Innoson': ['Carrier', 'G6', 'G5', 'G80', 'UMU'] },
    { 'Tesla': ['Model 3', 'Model X', 'Roadster', 'CyberTrunk', 'Semi'] },
    { 'Lexus': ['IS', 'ES', 'GS', 'LS', 'RX'] },
    { 'Ferrari': ['488GTB', 'F430', '458 Speciale', 'F599', 'ENZO'] },
    { 'Ford': ['Mustang', 'Ecosport', 'Edge', 'F150', 'Fiesta'] },
    { 'MClaren': ['720S', '600LT', '12C', '725LT', 'GT'] },
    { 'Maybach': ['Zeppelin', 'Exelero', 'GLS', 'SW35', 'SW45'] },
    { 'Porsche': ['911', 'Cayenne', 'Panamera', '718 Cayman', 'Macan'] },
  ];

  refRegex: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

  constructor(private fb: FormBuilder, private router: Router) {
    this.customerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      refCode: ["", [Validators.required, Validators.pattern(this.refRegex)]],
      email: ["", [Validators.required, Validators.email]],
      maker: ["", Validators.required],
      model: ["", Validators.required],
      conditions: this.fb.group({}),
    });
  }

  onMakerChange() {
    const modelControl = this.customerForm.get('model');
    if (modelControl) { // Check if the control exists
      modelControl.setValue(null);
    }
  }

  onNext() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      const selectedConditions = Object.keys(formData.conditions).filter(
        condition => formData.conditions[condition]
      );

      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        refCode: formData.refCode,
        email: formData.email,
        selectedMaker: formData.maker,
        selectedModel: formData.model,
        selectedConditions: selectedConditions,
      };

      this.router.navigate(['/summary'], { state: { data } });
    } else {
      // Handle validation errors
    }
  }
}
