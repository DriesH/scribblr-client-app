import { Component, OnInit } from '@angular/core';

import { StatisticService } from '../../../../../services/application-services/statistic.service';

@Component({
    selector: 'scrblr-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    providers: [StatisticService]
})
export class StatisticsComponent implements OnInit {


    stats = {
        memory_count: 0,
        book_count: 0,
        shared_count: 0,
        printed_memories_count: 0
    };


    constructor(private _ss: StatisticService) { }

    ngOnInit() {
        this._ss.getStats().subscribe(res => {
            console.log(res);
            this.stats.book_count = res.book_count;
            this.stats.memory_count = res.memory_count;
            this.stats.shared_count = res.shared_count;
            this.stats.printed_memories_count = res.printed_memories_count;
            console.log(this.stats);

        });
    }

    countToAmount(maxAmount: number) {

    }


}
