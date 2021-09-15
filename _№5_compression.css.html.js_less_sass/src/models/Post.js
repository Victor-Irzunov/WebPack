export default class Post {
	constructor(title, img) {
		this.title = title
		this.img = img
		this.date = new Date()
	}
	toString() {
		return JSON.stringify({
			title: this.title,
			date: this.date.toJSON(),
			img: this.img
		}, null, 2)                //2 кол-во пробелов
	}
	get upTitle() {
		return this.title.toUpperCase()
	}
}