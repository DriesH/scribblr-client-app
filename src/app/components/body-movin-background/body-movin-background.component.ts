import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'scrblr-body-movin-background',
    templateUrl: './body-movin-background.component.html',
    styleUrls: ['./body-movin-background.component.scss']
})
export class BodyMovinBackgroundComponent implements OnInit {

    public lottieConfig: Object;
    private anim: any;
    private animationSpeed = 1;

    constructor() {
        this.lottieConfig = {
            path: 'assets/json-data/background-anim.json',
            autoplay: true,
            loop: false
        };
    }

    handleAnimation(anim: any) {
        this.anim = anim;
    }

    stop() {
        this.anim.stop();
    }

    play() {
        this.anim.play();
    }

    pause() {
        this.anim.pause();
    }

    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }


    ngOnInit() {
    }

}
