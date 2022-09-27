class Nav {
	constructor() {
		this.section = document.querySelectorAll('section')
		this.menu = document.querySelectorAll('.site-nav a')
		this.events()
	}

	events() {
		window.addEventListener("scroll", () => this.setNav())
	}

	setNav() {
		this.section.forEach(i => {
		    this.top = window.scrollY
		    this.offset = i.offsetTop - 200
		    this.height = i.offsetHeight
		    this.id = i.getAttribute('id')
		    if (this.top >= this.offset && this.top < this.offset + this.height) {
			    this.menu.forEach(link => {
			        link.classList.remove('active')
			        document.querySelector('.site-nav a[id*=' + this.id + '-id' + ']')
			          .classList.add('active')
			    })
		    }
		})
	}
}
 
export default Nav;