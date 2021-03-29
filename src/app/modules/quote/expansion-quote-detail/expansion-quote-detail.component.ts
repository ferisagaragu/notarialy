import { Component, Input } from '@angular/core';
import { CompanyModel } from '../../../core/models/company.model';
import { ClientModel } from '../../../core/models/client.model';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-expansion-quote-detail',
  templateUrl: './expansion-quote-detail.component.html',
  styleUrls: ['./expansion-quote-detail.component.scss']
})
export class ExpansionQuoteDetailComponent {

  @Input() company: CompanyModel;
  @Input() client: ClientModel;
  @Input() user: UserModel;

}
