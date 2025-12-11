import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-letter',
  imports: [CommonModule],
  templateUrl: './letter.html',
  styleUrl: './letter.scss',
})
export class Letter {
  // Intro sequence states
  showTitle = false;
  showLoading = false;
  showMainCard = false;

  // Loading animation
  loadingDots = [false, false, false];

  // Card states
  isCardOpen = false;
  isTypingActive = false;

  letterCharacters: { char: string; isBreak: boolean; index: number }[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  readonly letterContent = `Dear Auntie,

Happy happy birthday po 💜

Today, I just want to pause for a moment and say thank you—thank you for everything, in ways words can never fully explain, but I'll try.

Salamat kaayo, Auntie, sa tanang panahon nga nagpabilin ka para nako. Sa mga adlaw nga klaro ang tanan, ug labi na sa mga panahong gubot kaayo ang akong hunahuna. Maski dili ko always kabalo unsaon pag-ingon, your support has always been there—quiet, steady, and real.

Thank you for your patience, your understanding, and your kindness. Sa mga moments nga naglibog ko, nagduha-duha, or kapoy na kaayo sa kaugalingon, ikaw ang usa sa mga rason nganong nagpadayon ko. Hindi mo man palaging sinasabi, pero ramdam ko palagi na naniniwala ka sa akin.

Maraming salamat po sa lahat ng sacrifices na ginawa mo—yung mga hindi nakikita, hindi naririnig, pero sobrang nararamdaman. Salamat sa mga dasal, sa pag-aalala, at sa pagmamamal na hindi kailanman humingi ng kapalit. Because of you, I learned what quiet strength and genuine love truly mean.

Usahay dili ko kabalo unsaon pag-sukli sa tanan, pero kabalo ko nga akong pasalamat tinuod ug lalom. Dako kaayo imong lugar sa akong kinabuhi ug sa akong kasing-kasing. You've shaped me more than you probably realize, and I will always carry that with me.

On your special day, I pray with all my heart that you are surrounded by peace, good health, and happiness. Hinaut nga matag adlaw pun-on sa kalipay, katawa, ug mga moments nga makapahinumdom nimo unsa ka ka espesyal.

You deserve all the love you give, Auntie—and even more. I'm endlessly grateful for you. Always, and in all ways.

With all my love,
—Your parang timang, Danghag, and Loving Tinuring na parang Anak 💜`;

  public beginIntroSequence() {
    // Build character array immediately
    this.letterCharacters = this.buildCharacters(this.letterContent);

    // Start intro sequence
    this.startIntroSequence();
  }

  private startIntroSequence() {
    // Phase 1: Show title (3 seconds)
    this.showTitle = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      // Phase 2: Show loading (2 seconds)
      this.showTitle = false;
      this.showLoading = true;
      this.startLoadingAnimation();
      this.cdr.detectChanges();

      setTimeout(() => {
        // Phase 3: Show card and start typing
        this.showLoading = false;
        this.showMainCard = true;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.isCardOpen = true;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.isTypingActive = true;
            this.cdr.detectChanges();
          }, 800);
        }, 300);
      }, 2000);
    }, 3000);
  }

  private startLoadingAnimation() {
    let dotIndex = 0;
    const interval = setInterval(() => {
      this.loadingDots = [false, false, false];
      this.loadingDots[dotIndex] = true;
      dotIndex = (dotIndex + 1) % 3;
      this.cdr.detectChanges();
    }, 400);

    setTimeout(() => clearInterval(interval), 2000);
  }

  scrollToNext() {
    document.querySelector('.wishes-container')?.scrollIntoView({ behavior: 'smooth' });
  }

  private buildCharacters(text: string) {
    const chars: { char: string; isBreak: boolean; index: number }[] = [];
    Array.from(text).forEach((char, index) => {
      const isBreak = char === '\n';
      chars.push({
        char: isBreak ? '' : char,
        isBreak,
        index,
      });
    });
    return chars;
  }
}
