async function start() {
	return  await Promise.resolve('async is working')
}

//Метод Promise.resolve(value) возвращает Promise выполненый с переданным значением.

start().then(console.log)

class Util {
	static id = Date.now()
}
console.log('Util.id: ', Util.id)