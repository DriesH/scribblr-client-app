import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scrblr-achievement-overview-root',
    templateUrl: './achievement-overview-root.component.html',
    styleUrls: ['./achievement-overview-root.component.scss']
})
export class AchievementOverviewRootComponent implements OnInit {

    achievements = [
        {
            title: 'Title test',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            points: 15,
            imageSrc: '/assets/achievements/mail.svg'
        },
        {
            title: 'Title test',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            points: 15,
            imageSrc: '/assets/achievements/mail.svg'
        },
        {
            title: 'Title test',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            points: 15,
            imageSrc: '/assets/achievements/mail.svg'
        }
    ];


    constructor() { }

    ngOnInit() {
    }

}
