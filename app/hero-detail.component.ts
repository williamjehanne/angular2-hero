import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/template/hero-detail.component.html',
})

export class HeroDetailComponent implements OnInit {
    hero: Hero;
    error: any;
    navigated = false;

    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        if (this._routeParams.get('id') !== null) {
            let id = +this._routeParams.get('id');
            this.navigated = true;
            this._heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this._heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack();
            })
            .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
