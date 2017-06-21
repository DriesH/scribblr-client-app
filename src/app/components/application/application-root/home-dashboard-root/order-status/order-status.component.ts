import { Component, OnInit, AfterViewInit } from '@angular/core';

import { CheckOutService } from '../../../../../services/application-services/check-out.service';

@Component({
    selector: 'scrblr-order-status',
    templateUrl: './order-status.component.html',
    styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterViewInit {

    activeOrders = [];

    constructor(private _cos: CheckOutService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._cos.orderStatus().subscribe(res => {
            this.activeOrders = res.orders;
        });
    }
}
