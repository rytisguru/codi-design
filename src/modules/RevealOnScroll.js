class RevealOnScroll {
	constructor() {
		this.reveals = document.querySelectorAll(".reveal")
		this.events()
	}

	events() {
		window.addEventListener("scroll", () => this.reveal())
		this.reveal()
	}

	isElementInViewport(el) {
	  // special bonus for those using jQuery
	  if (typeof jQuery === "function" && el instanceof jQuery) {
	    el = el[0];
	  }
	  var rect = el.getBoundingClientRect();
	  return (
	    (rect.top <= 0
	      && rect.bottom >= 0)
	    ||
	    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
	      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
	    ||
	    (rect.top >= 0 &&
	      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
	  );
	}

	reveal() {
		let oldValue = 0
		let newValue = 0

		for (var i = 0; i < this.reveals.length; i++) {
			newValue = window.scrollY;
			if (oldValue < newValue) {
				if (this.isElementInViewport(this.reveals[i])) {
					this.reveals[i].classList.add("active.fade-bottom")
				} else {
					this.reveals[i].classList.remove("active.fade-bottom")
				}
			} else {
				if (this.isElementInViewport(this.reveals[i])) {
					this.reveals[i].classList.add("active")
				} else {
					this.reveals[i].classList.remove("active")
				}
			}
			oldValue = newValue;
		}
	}
}

export default RevealOnScroll;