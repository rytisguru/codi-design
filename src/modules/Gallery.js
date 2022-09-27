class Gallery {
   constructor() {
      this.section = document.querySelectorAll('.gallery-section')
      this.events()
   }

   events() {
      window.addEventListener("scroll", () => this.onScroll())
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

   onScroll() {
      this.section.forEach(i => {
         if (this.isElementInViewport(i)) {
            i.classList.add('animate')
         } else {
            i.classList.remove('animate')
         }
      })
   }
}

export default Gallery;