/**
 * Typewriter effect utility
 * Cycles through an array of strings with typing and deleting animation
 */
export class Typewriter {
  constructor(element, strings, options = {}) {
    this.element = element;
    this.strings = strings;
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 40;
    this.pauseDuration = options.pauseDuration || 2000;
    this.cursorChar = options.cursorChar || '|';
    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
  }

  start() {
    this.tick();
    return this;
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  tick() {
    const currentString = this.strings[this.currentStringIndex];

    if (this.isDeleting) {
      this.currentCharIndex--;
    } else {
      this.currentCharIndex++;
    }

    const displayText = currentString.substring(0, this.currentCharIndex);
    this.element.textContent = displayText;

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentString.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
      delay = 400;
    }

    this.timeout = setTimeout(() => this.tick(), delay);
  }
}
