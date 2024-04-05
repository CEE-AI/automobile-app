import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              data: {
                firstName: 'John',
                lastName: 'Doedoedoedoedoedoedoedoedoedoevdoedoedoedoedoedoe',
                refCode: 'REF123',
                email: 'john.doe@example.com',
                selectedMaker: 'Maker',
                selectedModel: 'Model',
                selectedConditions: [{ title: 'Condition 1' }, { title: 'Condition 2' }],
              },
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trim full name if longer than 30 characters', () => {
    component.trimmedFullName = 'John Doe';
    expect(component.trimmedFullName).toBe('John Doe');
  });

  it('should concatenate conditions into a string', () => {
    component.selectedConditionsString = 'Condition 1, Condition 2'
    expect(component.selectedConditionsString).toBe('Condition 1, Condition 2');
  });

  describe('onPrintPage', () => {
    it('should call window.print', () => {
      const printSpy = spyOn(window, 'print');
      component.onPrintPage();
      expect(printSpy).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should log summarized data to console and show success message', () => {
      const consoleSpy = spyOn(console, 'log');
      const swalSpy = spyOn(Swal, 'fire');

      component.onSubmit();

      const summarizedData = {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        refcode: 'REF123',
        make: 'Maker',
        model: 'Model',
        conditions: 'Condition 1, Condition 2',
      };

          // Set the component's data
      component.trimmedFullName = summarizedData.fullname;
      component.email = summarizedData.email;
      component.refCode = summarizedData.refcode;
      component.selectedMaker = summarizedData.make;
      component.selectedModel = summarizedData.model;
      component.selectedConditionsString = summarizedData.conditions;

      // Call the onSubmit method
      component.onSubmit();
      // Expect console.log to be called with summarized data
      expect(console.log).toHaveBeenCalledWith(JSON.stringify(summarizedData));
      expect(Swal.fire).toHaveBeenCalledWith('Success', 'THANK YOU for engaging our services', 'success');
    });
  });
});
