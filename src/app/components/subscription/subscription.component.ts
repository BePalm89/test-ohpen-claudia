import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'src/app/shared/models/Subscription.model';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptions: Subscription[];
  test = false;
  gridColumns = 3;

  constructor(private subscriptionService: SubscriptionsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscriptions = this.getSubscriptionByGroup();
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  private getSubscriptionByGroup(): Subscription[] {
    const user = this.authService.getLoggedUser();
    return this.subscriptionService.getSubscriptionsByGroup(user.role);
  }


}
