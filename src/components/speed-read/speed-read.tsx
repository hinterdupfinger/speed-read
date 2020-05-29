import { Component, h, Method, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "speed-read",
  styleUrl: "speed-read.css",
  shadow: true,
})
export class SpeedRead {
  private readonly SHORT_WORD_LENGTH: number = 9;
  private readonly MS_PER_MINUTE = 60000;

  private words: string[] = [];
  private currentTimerId: number | undefined;

  @State() currentIndex: number = 0;

  @Prop() wpm: number = 450;

  @Method()
  async start() {
    this.currentTimerId = window.setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.words.length) {
        this.stop();
      }
    }, this.MS_PER_MINUTE / this.wpm);
  }

  @Method()
  async pause() {
    if (this.currentTimerId) {
      clearInterval(this.currentTimerId);
      this.currentTimerId = undefined;
    }
  }

  @Method()
  async stop() {
    this.currentIndex = 0;
    this.pause();
  }

  @Prop() text: string;

  @Watch("text")
  splitToWords(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stop();

      const allWords = newValue ? newValue.split(/\s+/) : [];

      this.words = allWords
        .flatMap((word) => {
          word = word.trim();

          if (word.length > 0) {
            if (
              word.length > this.SHORT_WORD_LENGTH ||
              word.includes(",") ||
              word.includes(":") ||
              word.includes("-") ||
              word.includes("(") ||
              word.includes(".") ||
              word.includes("!") ||
              word.includes("?") ||
              word.includes(":") ||
              word.includes(";") ||
              word.includes(")")
            ) {
              return [word, word];
            }
          }
          return [word];
        })
        .filter((word) => !!word || word !== "");
    }
  }

  render() {
    if (this.words.length === 0 && this.text !== "") {
      this.splitToWords(this.text, "");
    }

    return (
      <div class="reader" onClick={() => this.clickHandler()}>
        {this.currentIndex < this.words.length
          ? this.findFocusLetter(this.words[this.currentIndex])
          : ""}
      </div>
    );
  }

  findFocusLetter(word: string) {
    let start: string;
    let focus: string;
    let end: string;

    if (word.length > 1) {
      const center = word.length / 2;

      start = word.slice(0, center - 1);
      focus = word.slice(center - 1, center);
      end = word.slice(center, word.length);
    } else {
      focus = word;
    }
    return [
      <span class="start">{start}</span>,
      <span class="focus">{focus}</span>,
      <span class="end">{end}</span>,
    ];
  }

  private clickHandler() {
    if (this.currentTimerId) {
      this.pause();
    } else {
      this.start();
    }
  }
}
