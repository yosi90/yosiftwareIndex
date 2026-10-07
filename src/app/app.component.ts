import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren } from '@angular/core';

interface ProjectTech {
    name: string;
    icon: string;
    tooltip: string;
}

interface ProjectCard {
    title: string;
    subtitle?: string;
    url: string;
    backgroundImage: string;
    imageClass?: string;
    description: string;
    techs?: ProjectTech[];
    initialTransform?: string;
    isNew?: boolean;
}

const IMG = 'assets/img/';

const TECH: Record<'angular' | 'material' | 'bootstrap' | 'sqlserver' | 'firebaseHosting' | 'firebaseFull' | 'python' | 'spring' | 'react' | 'vite' | 'reactflow', ProjectTech> = {
    angular: { name: 'Angular', icon: IMG + 'angular.webp', tooltip: 'Angular - Framework del proyecto' },
    material: { name: 'Material angular', icon: IMG + 'material.svg', tooltip: 'Material angular' },
    bootstrap: { name: 'Bootstrap', icon: IMG + 'bootstrap.webp', tooltip: 'Bootstrap' },
    sqlserver: { name: 'Sql server', icon: IMG + 'sqlserver.webp', tooltip: 'Sql server - Persistencia de datos' },
    firebaseHosting: { name: 'Firebase', icon: IMG + 'firebase.webp', tooltip: 'Firebase - Hosting' },
    firebaseFull: { name: 'Firebase', icon: IMG + 'firebase.webp', tooltip: 'Firebase - Hosting, Realtime database y Authentication' },
    python: { name: 'Python', icon: IMG + 'python.webp', tooltip: 'Python - Api conexión Sql server' },
    spring: { name: 'Spring', icon: IMG + 'spring.webp', tooltip: 'Spring - Api conexión Sql server' },
    react: { name: 'React', icon: IMG + 'react.svg', tooltip: 'React - Framework del proyecto' },
    vite: { name: 'Vite', icon: IMG + 'vite.svg', tooltip: 'Vite - Build y servidor de desarrollo' },
    reactflow: { name: 'React Flow', icon: IMG + 'reactflow.svg', tooltip: 'React Flow - Lienzo de nodos y relaciones' }
};

const RESTING_SHADOW = '2px 2px 5px rgba(0, 0, 0, 0.4), -2px -2px 5px rgba(0, 0, 0, 0.4)';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnDestroy {
    @ViewChildren('featuredCard') private featuredCards!: QueryList<ElementRef<HTMLElement>>;

    resetVisible: boolean = false;

    readonly featuredProjects: ProjectCard[] = [
        {
            title: 'Curriculum',
            url: 'https://cv.yosiftware.es/',
            backgroundImage: IMG + 'cv.webp',
            imageClass: 'cv-card',
            description: 'Trayectoria, formación y experiencia.',
            initialTransform: 'perspective(500px) rotateX(0.802778deg) rotateY(6.17972deg)',
            techs: [TECH.angular, TECH.firebaseHosting, TECH.material, TECH.bootstrap]
        },
        {
            title: 'Nodaria',
            url: 'https://nodaria.yosiftware.es/',
            backgroundImage: IMG + 'nodaria.webp',
            imageClass: 'nodaria-card',
            description: 'Mapas mentales con esquemas, entidades y relaciones.',
            techs: [TECH.react, TECH.vite, TECH.reactflow, TECH.firebaseHosting],
            isNew: true
        },
        {
            title: 'Fichas 3.5',
            url: 'https://rol.yosiftware.es/',
            backgroundImage: IMG + 'fichas.webp',
            imageClass: 'fichas-card',
            description: 'Gestor de fichas de personaje para D&D 3.5.',
            techs: [TECH.angular, TECH.firebaseFull, TECH.material, TECH.bootstrap, TECH.python, TECH.sqlserver]
        },
        {
            title: 'Memoria',
            subtitle: 'bibliográfica',
            url: 'https://libros.yosiftware.es/',
            backgroundImage: IMG + 'biblioteca.webp',
            imageClass: 'libros-card',
            description: 'Registro personal de lecturas.',
            initialTransform: 'perspective(500px) rotateX(-0.802778deg) rotateY(-6.17972deg)',
            techs: [TECH.angular, TECH.firebaseHosting, TECH.material, TECH.bootstrap, TECH.spring, TECH.sqlserver]
        }
    ];

    readonly simpleProjects: ProjectCard[] = [
        {
            title: 'Yosircana',
            url: 'https://lorcana.yosiftware.es/',
            backgroundImage: IMG + 'yosircana.webp',
            description: 'Colección, mazos y estadísticas de Lorcana.',
            isNew: true
        },
        {
            title: 'ZooGenesis',
            url: 'https://zoogenesis.yosiftware.es/',
            backgroundImage: IMG + 'zoogenesis.webp',
            description: 'Juego de cartas de criaturas.'
        },
        {
            title: 'Día a día',
            url: 'https://dia.yosiftware.es/',
            backgroundImage: IMG + 'diaadia.webp',
            description: 'Registra cada día tu desempeño en distintas áreas.'
        },
        {
            title: 'Poke Voice',
            url: 'https://poke-voice.yosiftware.es/',
            backgroundImage: IMG + 'pokevoice.webp',
            description: 'Juego de voz para descubrir y completar la Pokédex.'
        },
        {
            title: 'Tv',
            url: 'https://tv.yosiftware.es/',
            backgroundImage: IMG + 'tv.webp',
            description: 'Acceso a la aplicación de televisión.'
        },
        {
            title: 'Syllabus ISTQB',
            url: 'https://istqb.yosiftware.es/',
            backgroundImage: IMG + 'syllabus-istqb.webp',
            description: 'Material de estudio del syllabus ISTQB.'
        }
    ];

    private readonly cleanups: Array<() => void> = [];

    constructor(private readonly zone: NgZone) { }

    ngAfterViewInit(): void {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        // Fuera de la zona para que cada mousemove no dispare la detección de cambios
        this.zone.runOutsideAngular(() => {
            this.featuredCards.forEach(({ nativeElement: card }) => {
                const onMove = (e: MouseEvent) => {
                    const cardPosition: DOMRect = card.getBoundingClientRect();
                    const cardCenterX: number = cardPosition.left + cardPosition.width / 2;
                    const cardCenterY: number = cardPosition.top + cardPosition.height / 2;
                    const cardRotateX: number = (e.clientY - cardCenterY) / 30;
                    const cardRotateY: number = (e.clientX - cardCenterX) / -30;
                    const shadowX: number = cardRotateX * -11;
                    const shadowY: number = cardRotateY * -11;
                    const shadowX2: number = cardRotateX * -7;
                    const shadowY2: number = cardRotateY * -7;
                    const shadowX3: number = cardRotateX * -3;
                    const shadowY3: number = cardRotateY * -3;

                    card.style.boxShadow = `0px 10px 15px rgb(14, 13, 13), 10px 0px 15px rgb(14, 13, 13), 0px -10px 15px rgb(46, 24, 24), -10px 0px 15px rgb(46, 24, 24), ${shadowY}px ${shadowX}px 20px rgba(0, 0, 0, .3), ${shadowY2}px ${shadowX2}px 20px rgba(59, 59, 59, .3), ${shadowY3}px ${shadowX3}px 20px rgba(59, 59, 59, .3)`;
                    card.style.transform = `perspective(500px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`;
                };

                const onLeave = () => {
                    card.style.boxShadow = RESTING_SHADOW;
                    if (!this.resetVisible) {
                        this.zone.run(() => this.resetVisible = true);
                    }
                };

                card.addEventListener('mousemove', onMove);
                card.addEventListener('mouseleave', onLeave);
                this.cleanups.push(() => {
                    card.removeEventListener('mousemove', onMove);
                    card.removeEventListener('mouseleave', onLeave);
                });
            });
        });
    }

    ngOnDestroy(): void {
        this.cleanups.forEach(cleanup => cleanup());
    }

    resetCards(): void {
        this.featuredCards.forEach(({ nativeElement: card }, index: number) => {
            card.style.transform = this.featuredProjects[index].initialTransform || 'none';
            card.style.boxShadow = 'none';
        });

        this.resetVisible = false;
    }
}
