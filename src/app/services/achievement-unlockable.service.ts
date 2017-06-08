import { Injectable } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

interface Achievement {
    title: string;
    points: number;
    image: string;
};

@Injectable()
export class AchievementUnlockableService {

    constructor(private _ns: NotificationsService) { }

    public handleAchievement(achievement: Achievement) {
        this._ns.info('Unlocked an Achievement!', achievement.title, {
            icon: 'warn'
        });
    }

}
