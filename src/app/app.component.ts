import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'Yosiftware';

    ngOnInit(): void {
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll(".card");

        if (cards) {
            cards.forEach((card: HTMLElement) => {
                card.addEventListener("mousemove", (e: MouseEvent) => {
                    const cardPosition: DOMRect = card.getBoundingClientRect();
                    const cardCenterX: number = cardPosition.left + cardPosition.width / 2;
                    const cardCenterY: number = cardPosition.top + cardPosition.height / 2;
                    const cardRotateX: number = (e.pageY - cardCenterY) / 30;
                    const cardRotateY: number = (e.pageX - cardCenterX) / -30;
                    const shadowX: number = cardRotateX * -6;
                    const shadowY: number = cardRotateY * -6;

                    card.style.boxShadow = `0px 5px 10px rgb(14, 13, 13), 5px 0px 10px rgb(14, 13, 13), 0px -5px 10px rgb(46, 24, 24), -5px 0px 10px rgb(46, 24, 24), ${shadowY}px ${shadowX}px 20px rgba(0, 0, 0, .3)`;
                    card.style.transform = `perspective(500px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) translateZ(50px)`;
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = "none";
                    card.style.boxShadow = "5px 5px 10px rgb(46, 35, 35), -5px -5px 10px rgb(46, 35, 35), 5px -5px 10px rgb(46, 35, 35), -5px 5px 10px rgb(46, 35, 35)";
                });
            });
        }
    }
}