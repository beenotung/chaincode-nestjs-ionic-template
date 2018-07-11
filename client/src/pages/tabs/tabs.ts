import { Component } from '@angular/core';

import { RequestListPage } from '../request-list/request-list';
import { ResponseListPage } from '../response-list/response-list';

interface TabItem {
  page: any;
  title: string;
  icon: string;
}

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public tabs: TabItem[] = [
    {
      page: RequestListPage,
      title: 'Req List',
      icon: 'chatboxes',
    },
    {
      page: ResponseListPage,
      title: 'Res List',
      icon: 'egg',
    },
  ];
}
