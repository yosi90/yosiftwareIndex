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
            cards.forEach((card) => {
                card.addEventListener("mousemove", (e: MouseEvent) => {
                    const cardPosition: DOMRect = card.getBoundingClientRect();
                    const cardCenterX: number = cardPosition.left + cardPosition.width / 2;
                    const cardCenterY: number = cardPosition.top + cardPosition.height / 2;
                    const cardRotateX: number = (e.pageY - cardCenterY) / 30;
                    const cardRotateY: number = (e.pageX - cardCenterX) / -30;

                    card.style.transform = `perspective(500px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) translateZ(50px)`;
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = "none";
                });
            });
        }
    }
}