import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to summary page with valid form data and at least one condition selected', () => {
    spyOn(router, 'navigate').and.stub()
    spyOn(Swal, 'fire').and.stub();

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      refCode: 'ReF123456?.#',
      email: 'john.doe@example.com',
      maker: 'Toyota',
      model: 'RAV 4',
    };
    const selectedConditions: any = [];

    if (!Object.values(selectedConditions).some(condition => condition)) {
        Swal.fire('Error',"Please select at least one car condition.", 'error');
        return; // Prevent further execution
      }

    component.customerForm.setValue(formData);

    component.conditions[0].selected = true; // Selecting at least one condition

    component.onNext();

    expect(Swal.fire).not.toHaveBeenCalled(); // No error message should be shown
    expect(router.navigate).toHaveBeenCalledWith(['/summary'], {
       state: {
         data: { 
          ...formData, 
          selectedConditions: [component.selectedConditions[0]] 
        } 
      } 
    });
  });

  it('should show error message if form is invalid', () => {
    spyOn(Swal, 'fire').and.stub();

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      refCode: 'ReF123456?.#',
      email: 'john.doe@example.com',
      maker: 'Toyota',
      model: 'RAV 4',
    };

    component.customerForm.setValue(formData);

    component.onNext();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Please fill all required fields correctly', 'error');
  });

  it('should show error message if no condition is selected', () => {
    spyOn(Swal, 'fire').and.stub();

    const selectedConditions: any = []
    
    if (!Object.values(selectedConditions).some(condition => condition)) {
        Swal.fire('Error',"Please select at least one car condition.", 'error');
        return; // Prevent further execution
      }

      component.onNext();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Please select at least one car condition.', 'error');
    expect(router.navigate).not.toHaveBeenCalled(); // No navigation should occur
  });

});
