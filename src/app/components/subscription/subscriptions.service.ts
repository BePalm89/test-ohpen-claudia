import { Injectable } from '@angular/core';
import { Subscription } from 'src/app/shared/models/Subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  subscriptions: Subscription[] = [
      {
         "id":1,
         "user_group":"administrator",
         "title":"Subscription 1",
         "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
         "state": false
      },
      {
         "id":2,
         "user_group":"rrhh",
         "title":"Subscription 2",
         "description":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
         "state": true
      },
      {
         "id":3,
         "user_group":"administrator",
         "title":"Subscription 3",
         "description":"When an unknown printer took a galley of type and scrambled it to make a type specimen book.",
         "state": false
      },
      {
         "id":4,
         "user_group":"administrator",
         "title":"Subscription 4",
         "description":"It has survived not only five centuries, but also the leap into electronic typesetting.",
         "state": true
      },
      {
         "id":5,
         "user_group":"rrhh",
         "title":"Subscription 5",
         "description":"t was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
         "state": false
      },
      {
         "id":6,
         "user_group":"administrator",
         "title":"Subscription 6",
         "description":"Many desktop publishing packages and web page editors now use Lorem Ipsum astheir default model text",
         "state": true
      }
  ]

  constructor() { }
  

  getSubscriptionsByGroup(group: string): Subscription[] {
     return this.subscriptions.filter(el => el.user_group === group);
  }
}
