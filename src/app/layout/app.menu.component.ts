import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Predict', icon: 'pi pi-bolt', routerLink: ['/predict'] },
                    { label: 'History', icon: 'pi pi-history', routerLink: ['/prediction-h'] },
                    { label: 'Pretrained Models', icon: 'pi pi-database', routerLink: ['/pretrained-models'] }
                ]
            }
        ];
    }
}
