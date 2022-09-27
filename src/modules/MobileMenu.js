class MobileMenu {
  constructor() {
    this.menu = document.querySelector(".header-meniu")
    this.openButton = document.getElementById('burger');
    this.events()
  }

  events() {
    this.openButton.addEventListener("click", () => this.openMenu())
  }

  openMenu() {
    this.openButton.classList.toggle("fa-bars")
    this.openButton.classList.toggle("fa-window-close")
    this.menu.classList.toggle("header-meniu-active")
  }
}

export default MobileMenu
