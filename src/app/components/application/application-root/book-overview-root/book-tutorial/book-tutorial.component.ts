import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { TutorialService} from '../../../../../services/application-services/tutorial.service';

@Component({
    selector: 'scrblr-book-tutorial',
    templateUrl: './book-tutorial.component.html',
    styleUrls: ['./book-tutorial.component.scss'],
    animations: [
        trigger('sizeDown', [
            state('in', style({ transform: 'scale(1)' })),
            state('out', style({ transform: 'scale(0)' })),
            transition('in <=> out', animate('100ms ease-out'))
        ])
    ]
})
export class BookTutorialComponent implements OnInit {

    @Output('closeTutorial') closeTutorial = new EventEmitter<Boolean>();

    closingTutorial = 'in';

    currentStep = 1;

    images = [
        '/assets/child-head-test/de-ronny.png',
        '/assets/child-head-test/de-ronny.png',
        '/assets/child-head-test/de-ronny.png',
    ];

    explanations = [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a efficitur quam. Donec congue arcu ut urna
        volutpat imperdiet.Nunc varius lacinia arcu, vitae suscipit enim consequat vel.Proin convallis lacus
        vitae.`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a efficitur quam. Donec congue arcu ut urna
        volutpat imperdiet.Nunc varius lacinia arcu, vitae suscipit enim consequat vel.Proin convallis lacus
        vitae dapibus congue.`,
        `Lorem ipsum dolor sit amet. Donec congue arcu ut urna volutpat imperdiet.Nunc varius lacinia arcu,
        vitae suscipit enim consequat vel.Proin convallis lacus vitae dapibus congue.`,
    ];

    constructor(private _ts: TutorialService) { }

    ngOnInit() {
    }

    nextStep() {
        this.currentStep++;
    }

    setStep(step) {

        if (step > this.currentStep + 1) {
            return;
        }

        this.currentStep = step;
    }

    skipTutorial() {
        // this._ts.skipTutorial().subscribe(res => {
        //     console.log(res);
        // });
            this.closeTutorialFn();
    }

    completedTutorial() {
        this._ts.completedTutorial().subscribe(res => {
            console.log(res);
        });
            this.closeTutorialFn();
    }

    closeTutorialFn() {
        this.closingTutorial = 'out';
        this.closeTutorial.emit(true);
    }
}
