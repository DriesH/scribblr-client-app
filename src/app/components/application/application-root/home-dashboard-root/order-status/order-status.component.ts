import { Component, OnInit } from '@angular/core';

import { CheckOutService } from '../../../../../services/application-services/check-out.service';

@Component({
    selector: 'scrblr-order-status',
    templateUrl: './order-status.component.html',
    styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

    constructor(private _cos: CheckOutService) { }

    ngOnInit() {
        this._cos.orderStatus().subscribe(res => {
            console.log(res);
        });
    }

}
