import Keyboard from './Keyboard.js'
import Mouse from './Mouse.js'

export default class Window{
    constructor(){
        this.keyboard = new Keyboard()
        this.mouse = new Mouse()
    }

    initEvents(){
        document.addEventListener('keydown', (event) => {
            const key = event.keyCode
            this.keyboard.setKeyPressed(key)
        })
        document.addEventListener('keyup', (event) => {
            const key = event.keyCode
            this.keyboard.setKeyReleased(key)
        })
        document.addEventListener('mousedown', (event) => {
            const key = event.button
            this.mouse.setButtonPressed(key)
        })
        document.addEventListener('mouseup', (event) => {
            const key = event.button
            this.mouse.setButtonReleased(key)
        })
    }
}