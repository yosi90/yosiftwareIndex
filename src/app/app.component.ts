import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'Yosiftware';
    resetVisible: boolean = false;

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
        const cards: NodeListOf<HTMLElement> = document.querySelectorAll(".card");
        // cards.forEach(c => {
        //     c.style.transform = "none";
        // });
        cards[0].style.transform = "perspective(500px) rotateX(0.802778deg) rotateY(6.17972deg)";
        cards[1].style.transform = "none";
        cards[2].style.transform = "none";
        cards[3].style.transform = "perspective(500px) rotateX(-0.802778deg) rotateY(-6.17972deg)";
        this.resetVisible = false;
    }
}