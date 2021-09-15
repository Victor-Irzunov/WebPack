import * as $ from 'jquery'

//переписываем на jquery  1:29:20
//считаем клики по документу (работает независимо)
function f_1(){
	let counter = 0
	let destroyed = false

	const listener = () => counter++

	$(document).on('click', listener)

	return {
		destroy() {
			$(document).off('click', listener)
			destroyed = true
		},

		getClicks() {
			if (destroyed) {
				return `Analytics is Destroyed (Аналитика уничтожена) Total clicks = ${counter}`
			}
			return counter
		}
	}
}

window.analytics = f_1()