import { Component, OnInit, Input } from '@angular/core';

interface StoryModel {
    story: string;
}

@Component({
    selector: 'scrblr-quick-story',
    templateUrl: './quick-story.component.html',
    styleUrls: ['./quick-story.component.scss']
})
export class QuickStoryComponent implements OnInit {

    @Input('children') children;


    storyModel: StoryModel = {
        story: null
    };

    constructor() { }

    ngOnInit() {
    }

}
