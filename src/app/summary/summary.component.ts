import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  trimmedFullName: string ='';
  email: string ='';
  refCode: string ='';
  selectedMaker: string ='';
  selectedModel: string ='';
  selectedConditionsString: string ='';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state.data;

      if (state) {
        const {
          firstName,
          lastName,
          refCode,
          email,
          selectedMaker,
          selectedModel,
          selectedConditions,
        } = state;

        // Combine first and last names for fullName
        const fullName = `${firstName} ${lastName}`;

        this.trimmedFullName =
          fullName.length > 30 ? `${fullName.substring(0, 30)}...` : fullName;
        this.email = email;
        this.refCode = refCode;
        this.selectedMaker = selectedMaker;
        this.selectedModel = selectedModel;

        // Convert selectedConditions array to a comma-separated string
        this.selectedConditionsString = selectedConditions
          .filter((condition:any) => condition)
          .join(', ');
      }
    });
  }

  onSubmit() {
    // Create a JSON object with the summarized data
    const jsonData = {
      name: this.trimmedFullName,
      email: this.email,
      refcode: this.refCode,
      make: this.selectedMaker,
      model: this.selectedModel,
      conditions: this.selectedConditionsString,
    };

    console.log(JSON.stringify(jsonData));
  }
}
