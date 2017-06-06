import { Component, OnInit, Input } from '@angular/core';

interface Achievement {
    title: String;
    description: String;
    points: Number;
    image: String;
};


@Component({
  selector: 'scrblr-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {

    @Input() achievementData: Achievement;

    constructor() { }

    ngOnInit() {
    }

}
