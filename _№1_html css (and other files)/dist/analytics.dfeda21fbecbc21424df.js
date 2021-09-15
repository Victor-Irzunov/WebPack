/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
eval("//считаем клики по документу (работает независимо)\r\nfunction f_1(){\r\n\tlet counter = 0\r\n\tlet destroyed = false\r\n\r\n\tconst listener = () => counter++\r\n\r\n\tdocument.addEventListener('click', listener)\r\n\r\n\treturn {\r\n\t\tdestroy() {\r\n\t\t\tdocument.removeEventListener('click', listener)\r\n\t\t\tdestroyed = true\r\n\t\t},\r\n\r\n\t\tgetClicks() {\r\n\t\t\tif (destroyed) {\r\n\t\t\t\treturn `Analytics is Destroyed (Аналитика уничтожена) Total clicks = ${counter}`\r\n\t\t\t}\r\n\t\t\treturn counter\r\n\t\t}\r\n\t}\r\n}\r\n\r\nwindow.analytics = f_1()\n\n//# sourceURL=webpack:///./analytics.js?");
/******/ })()
;