import { Component, OnInit, Input } from '@angular/core';

interface Achievement {
    title: String;
    content: String;
    points: Number;
    imageSrc: String;
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
