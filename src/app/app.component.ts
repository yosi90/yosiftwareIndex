import { AfterViewInit, Component } from '@angular/core';

interface ProjectTech {
    name: string;
    icon: string;
    className: string;
    tooltip: string;
}

interface ProjectCard {
    title: string;
    subtitle?: string;
    url: string;
    kind: 'featured' | 'simple';
    backgroundId?: string;
    imageClass?: string;
    description?: string;
    techs?: ProjectTech[];
    initialTransform?: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
    title = 'Yosiftware';
    resetVisible: boolean = false;
    readonly featuredProjects: ProjectCard[] = [
        {
            title: 'Curriculum',
            url: 'https://cv.yosiftware.es/',
            kind: 'featured',
            backgroundId: 'cv',
            imageClass: 'cv-card',
            initialTransform: 'perspective(500px) rotateX(0.802778deg) rotateY(6.17972deg)',
            techs: [
                { name: 'Angular', icon: '../assets/img/angular.png', className: 'angular', tooltip: 'Angular - Framework del proyecto' },
                { name: 'Firebase', icon: '../assets/img/firebase.png', className: 'firebase', tooltip: 'Firebase - Hosting' },
                { name: 'Material angular', icon: '../assets/img/material.svg', className: 'material', tooltip: 'Material angular' },
                { name: 'Bootstrap', icon: '../assets/img/bootstrap.png', className: 'bootstrap', tooltip: 'Bootstrap' }
            ]
        },
        {
            title: 'ZooGenesis',
            url: 'https://zoogenesis.yosiftware.es/',
            kind: 'featured',
            backgroundId: 'zoogenesis',
            techs: [
                { name: 'Angular', icon: '../assets/img/angular.png', className: 'angular', tooltip: 'Angular - Framework del proyecto' },
                { name: 'Firebase', icon: '../assets/img/firebase.png', className: 'firebase', tooltip: 'Firebase - Hosting, Realtime database y Authentication' },
                { name: 'Material angular', icon: '../assets/img/material.svg', className: 'material', tooltip: 'Material angular' }
            ]
        },
        {
            title: 'Fichas 3.5',
            url: 'https://rol.yosiftware.es/',
            kind: 'featured',
            backgroundId: 'fichas',
            techs: [
                { name: 'Angular', icon: '../assets/img/angular.png', className: 'angular', tooltip: 'Angular - Framework del proyecto' },
                { name: 'Firebase', icon: '../assets/img/firebase.png', className: 'firebase', tooltip: 'Firebase - Hosting, Realtime database y Authentication' },
                { name: 'Material angular', icon: '../assets/img/material.svg', className: 'material', tooltip: 'Material angular' },
                { name: 'Bootstrap', icon: '../assets/img/bootstrap.png', className: 'bootstrap', tooltip: 'Bootstrap' },
                { name: 'Python', icon: '../assets/img/python.png', className: 'python', tooltip: 'Python - Api conexión Sql server' },
                { name: 'Sql server', icon: '../assets/img/sqlserver.png', className: 'sqlserver', tooltip: 'Sql server - Persistencia de datos' }
            ]
        },
        {
            title: 'Memoria',
            subtitle: 'bibliográfica',
            url: 'https://libros.yosiftware.es/',
            kind: 'featured',
            backgroundId: 'libros',
            initialTransform: 'perspective(500px) rotateX(-0.802778deg) rotateY(-6.17972deg)',
            techs: [
                { name: 'Angular', icon: '../assets/img/angular.png', className: 'angular', tooltip: 'Angular - Framework del proyecto' },
                { name: 'Firebase', icon: '../assets/img/firebase.png', className: 'firebase', tooltip: 'Firebase - Hosting' },
                { name: 'Material angular', icon: '../assets/img/material.svg', className: 'material', tooltip: 'Material angular' },
                { name: 'Bootstrap', icon: '../assets/img/bootstrap.png', className: 'bootstrap', tooltip: 'Bootstrap' },
                { name: 'Spring', icon: '../assets/img/spring.png', className: 'python', tooltip: 'Spring - Api conexión Sql server' },
                { name: 'Sql server', icon: '../assets/img/sqlserver.png', className: 'sqlserver', tooltip: 'Sql server - Persistencia de datos' }
            ]
        }
    ];
    readonly simpleProjects: ProjectCard[] = [
        {
            title: 'Día a día',
            url: 'https://dia.yosiftware.es/',
            kind: 'simple',
            imageClass: 'diaadia',
            description: 'Soporte psicológico para registrar cada día tu desempeño en distintas áreas.'
        },
        {
            title: 'Poke Voice',
            url: 'https://poke-voice.yosiftware.es/',
            kind: 'simple',
            imageClass: 'pokevoice',
            description: 'Juego de voz para descubrir y completar la Pokedex.'
        }
    ];

    ngAfterViewInit(): void {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const cards: NodeListOf<HTMLElement> = document.querySelectorAll(".featured-card");

        if (cards) {
            cards.forEach((card: HTMLElement) => {
                card.addEventListener("mousemove", (e: MouseEvent) => {
                    const cardPosition: DOMRect = card.getBoundingClientRect();
                    const cardCenterX: number = cardPosition.left + cardPosition.width / 2;
                    const cardCenterY: number = cardPosition.top + cardPosition.height / 2;
                    const cardRotateX: number = (e.pageY - cardCenterY) / 30;
                    const cardRotateY: number = (e.pageX - cardCenterX) / -30;
                    const shadowX: number = cardRotateX * -11;
                    const shadowY: number = cardRotateY * -11;
                    const shadowX2: number = cardRotateX * -7;
                    const shadowY2: number = cardRotateY * -7;
                    const shadowX3: number = cardRotateX * -3;
                    const shadowY3: number = cardRotateY * -3;

                    card.style.boxShadow = `0px 10px 15px rgb(14, 13, 13), 10px 0px 15px rgb(14, 13, 13), 0px -10px 15px rgb(46, 24, 24), -10px 0px 15px rgb(46, 24, 24), ${shadowY}px ${shadowX}px 20px rgba(0, 0, 0, .3), ${shadowY2}px ${shadowX2}px 20px rgba(59, 59, 59, .3), ${shadowY3}px ${shadowX3}px 20px rgba(59, 59, 59, .3)`;
                    card.style.transform = `perspective(500px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`;
                });

                card.addEventListener("mouseleave", () => {
                    // card.style.transform = "none";
                    this.resetVisible = true;
                    card.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.4), -2px -2px 5px rgba(0, 0, 0, 0.4)";
                });
            });
        }
    }

    resetCards() {
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll(".featured-card");

        cards.forEach((card: HTMLElement, index: number) => {
            card.style.transform = this.featuredProjects[index].initialTransform || "none";
            card.style.boxShadow = "none";
        });

        this.resetVisible = false;
    }
}
