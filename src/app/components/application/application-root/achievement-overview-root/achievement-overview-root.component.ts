import { Component, OnInit } from '@angular/core';

import { AchievementService } from '../../../../services/application-services/achievement.service';

@Component({
    selector: 'scrblr-achievement-overview-root',
    templateUrl: './achievement-overview-root.component.html',
    styleUrls: ['./achievement-overview-root.component.scss']
})
export class AchievementOverviewRootComponent implements OnInit {

    // achievements = [
    //     {
    //         title: 'Title test',
    //         description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //             magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    //             consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    //         points: 15,
    //         image: '/assets/achievements/mail.svg'
    //     },
    //     {
    //         title: 'Title test',
    //         description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //             magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    //             consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    //         points: 15,
    //         image: '/assets/achievements/mail.svg'
    //     },
    //     {
    //         title: 'Title test',
    //         description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
    //             magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    //             consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    //         points: 15,
    //         image: '/assets/achievements/mail.svg'
    //     }
    // ];

    achievementCategories;
    totalPoints;

    constructor(
        private _as: AchievementService,
    ) { }

    ngOnInit() {
        this._as.getAllAchievements()
            .subscribe(res => {
                console.log(res);
                this.achievementCategories = res.achievements;
                this.totalPoints = res.total_points;
            });

    }



}
