import { Component, OnInit } from '@angular/core';

import { AchievementService } from '../../../../services/application-services/achievement.service';

@Component({
    selector: 'scrblr-achievement-overview-root',
    templateUrl: './achievement-overview-root.component.html',
    styleUrls: ['./achievement-overview-root.component.scss']
})
export class AchievementOverviewRootComponent implements OnInit {

    achievementCategories;
    totalPoints = 0;
    isLoadingAchievements = false;

    constructor(
        private _as: AchievementService,
    ) { }

    ngOnInit() {
        this.isLoadingAchievements = true;

        this._as.getAllAchievements()
            .subscribe(res => {
                // console.log(res);
                this.achievementCategories = res.achievements;
                this.totalPoints = res.total_points;
                this.isLoadingAchievements = false;
            });

    }



}
