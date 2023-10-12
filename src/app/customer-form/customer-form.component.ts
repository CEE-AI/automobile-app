import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  refCode: string = ''
  //validation condition for reference code (refCode)
  refRegex: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
  carConditions = false;

  conditions = [
    {title: 'Engine Issue', selected: false},
    {title: 'Brake Issue', selected: false},
    {title: 'Gearbox Issue', selected: false},
    {title: 'Oil Leakage', selected: false},
    {title: 'Wiring Problems', selected: false},
    {title: 'Need Repainting', selected: false},
    {title: 'Need Body Repair', selected: false}
  ]
  autoMakers: string[] = [
    'Toyota', 'Innoson', 'Mercedes', 'Tesla', 'Lexus', 'Ferrari', 'Ford', 'MClaren', 'Maybach', 'Porsche'
  ];
  autoModels: { [key: string]: string[] }[] = [
    {'Toyota': ['GR Supra', 'RAV 4', 'PRIUS', 'TACOMA', 'MIRAI'] },
    {'Mercedes': ['EQE', 'EQS-SUV', 'GLE Coupe', 'V-Class', 'EQS'] },
    {'Innoson': ['Carrier', 'G6', 'G5', 'G80', 'UMU'] },
    {'Tesla': ['Model 3', 'Model X', 'Roadster', 'CyberTrunk', 'Semi'] },
    {'Lexus': ['IS', 'ES', 'GS', 'LS', 'RX'] },
    {'Ferrari': ['488GTB', 'F430', '458 Speciale', 'F599', 'ENZO'] },
    {'Ford': ['Mustang', 'Ecosport', 'Edge', 'F150', 'Fiesta'] },
    {'MClaren': ['720S', '600LT', '12C', '725LT', 'GT'] },
    {'Maybach': ['Zeppelin', 'Exelero', 'GLS', 'SW35', 'SW45'] },
    {'Porsche': ['911', 'Cayenne', 'Panamera', '718 Cayman', 'Macan'] },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.customerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      refCode: ["", [Validators.required, Validators.pattern(this.refRegex)]],
      email: ["", [Validators.required, Validators.email]],
      maker: ["", Validators.required],
      model: ["", Validators.required],
    });
  }

  // logic for selection of car conditions in checkboxes
  toggleConditions() {
    this.conditions.forEach((c) => (c.selected = this.carConditions))
  }
  conditionsChanged() {
    if (this.isAllCheckboxSelected()) this.carConditions = true
    else this.carConditions = false
  }

  get selectedConditions() {
    return this.conditions.filter((c) => c.selected);
  }

  isAllCheckboxSelected() {
    return this.conditions.every((c) => c.selected)
  }

  // car model reset when maker is changed
  onMakerChange() {
    const modelControl = this.customerForm.get('model');
    if (modelControl) { // Check if the control exists
      modelControl.setValue(null);
    }
  }
  
  //Form page execution
  onNext() {
    this.customerForm.markAllAsTouched();
    let selectedConditions = this.selectedConditions

    if (this.customerForm.valid) {
      const formData = this.customerForm.value;     
      // Check if at least one condition is selected
      if (!Object.values(selectedConditions).some(condition => condition)) {
        Swal.fire('Error',"Please select at least one car condition.", 'error');
        return; // Prevent further execution
      }

      //Data value collation from form page and checkbox selection
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        refCode: formData.refCode,
        email: formData.email,
        selectedMaker: formData.maker,
        selectedModel: formData.model,
        selectedConditions: selectedConditions,
      };
      // console.log(data)
      this.router.navigate(['/summary'], { state: { data } });
    } else {
        // Handle validation errors
      Swal.fire('Error',"Please fill all required fields correctly", 'error')
    }
  }
}
