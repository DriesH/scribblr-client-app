import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

interface QuickAccessModel {
    type: string;
    childShortId: string;
}

@Component({
    selector: 'scrblr-quick-access',
    templateUrl: './quick-access.component.html',
    styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnInit {

    @Input('children') children;

    quickAccessModel: QuickAccessModel = {
        type: 'quote',
        childShortId: 'default'
    };

    errorChild = false;

    constructor(private router: Router) { }

    ngOnInit() { }

    startQuickMemory(model: QuickAccessModel) {
        if (model.childShortId === 'default') {
            this.errorChild = true;
            return;
        }

        switch (model.type) {
            case 'quote':
                this.router.navigate(['application', 'overview', model.childShortId, 'new-quote']);
                break;
            case 'story':
                this.router.navigate(['application', 'overview', model.childShortId, 'new-story']);
                break;
            default:
                this.errorChild = true;
                return;
        }
    }
}
