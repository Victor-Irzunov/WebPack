//считаем клики по документу (работает независимо)
function f_1(){
	let counter = 0
	let destroyed = false

	const listener = () => counter++

	document.addEventListener('click', listener)

	return {
		destroy() {
			document.removeEventListener('click', listener)
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