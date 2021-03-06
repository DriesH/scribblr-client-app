import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { Store } from '@ngrx/store';

import * as UserActions from '../../../../../ngrx-state/actions/current-user.action';

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

    @Input('currentUser') currentUser;

    @Output('closeTutorial') closeTutorial = new EventEmitter<Boolean>();

    closingTutorial = 'in';

    currentStep = 1;
    maxStep = 3;

    showCompleteButton = false;

    images = [
        '/assets/book-tutorial/tutorial-page-1.gif',
        '/assets/book-tutorial/tutorial-page-2.gif',
        '/assets/book-tutorial/tutorial-page-3.gif',
    ];

    explanations = [
        `Start by selecting a cover from our collection. We limited this to our own covers`,
        `Add new quotes to pages by draging them from the sidebar to the page you want them on.`,
        `Save the book or order and save the book.`,
    ];

    constructor(private _ts: TutorialService, private store: Store<any>) { }

    ngOnInit() {
    }

    nextStep() {
        if (this.currentStep >= this.maxStep) {
            this.currentStep = this.maxStep;
            this.showCompleteButton = true;
        } else {
            this.currentStep++;

            if (this.currentStep === this.maxStep) {
                this.showCompleteButton = true;
            }
        }
    }

    setStep(step) {

        if (step > this.currentStep + 1) {
            return;
        }

        this.currentStep = step;
    }

    skipTutorial() {
        this._ts.skipTutorial().subscribe(res => {
            // console.log(res);
            this.closeTutorialFn();
        });
    }

    completedTutorial() {
        this._ts.completedTutorial().subscribe(res => {
            // console.log(res);

            this.currentUser = Object.assign({}, this.currentUser, { has_seen_book_tutorial: 1 });

            this.store.dispatch(new UserActions.UpdateUser({ user: this.currentUser }));

            this.closeTutorialFn();
        });
    }

    closeTutorialFn() {
        this.closingTutorial = 'out';
        this.closeTutorial.emit(true);
    }
}
