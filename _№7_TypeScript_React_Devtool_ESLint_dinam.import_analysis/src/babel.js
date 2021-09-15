async function start() {
	return  await Promise.resolve('async is working')
}

//Метод Promise.resolve(value) возвращает Promise выполненый с переданным значением.

start().then(console.log)

const unused = 42

class Util {
	static id = Date.now()
}
console.log('Util.id: ', Util.id)
console.log(unused)



//import писать где угодно           2:43:00
import('lodash').then(_ => {
	console.log('Lodash', _.random(0, 42, true))
})