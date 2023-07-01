function right (num: number) {
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.pause(num)
    stop()
}
function back (num: number) {
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(num)
    stop()
}
function left (num: number) {
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(num)
    stop()
}
function stop () {
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
function Back (num: number) {
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(num)
    stop()
}
function forward (num: number) {
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.pause(num)
    stop()
}
let RIGHT = 0
let LEFT = 0
let FORWARD = 0
servos.P2.setAngle(90)
basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
basic.forever(function () {
    servos.P2.setAngle(90)
    FORWARD = sonar.ping(
    DigitalPin.P8,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    servos.P2.setAngle(135)
    basic.pause(500)
    LEFT = sonar.ping(
    DigitalPin.P8,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    servos.P2.setAngle(45)
    basic.pause(750)
    RIGHT = sonar.ping(
    DigitalPin.P8,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    servos.P2.setAngle(90)
    if (FORWARD < 30 || (LEFT || RIGHT) < 10) {
        basic.showArrow(ArrowNames.North)
        back(500)
        servos.P2.setAngle(135)
        basic.pause(500)
        LEFT = sonar.ping(
        DigitalPin.P8,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
        servos.P2.setAngle(45)
        basic.pause(750)
        RIGHT = sonar.ping(
        DigitalPin.P8,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
        servos.P2.setAngle(90)
        if (RIGHT >= LEFT) {
            basic.showArrow(ArrowNames.East)
            left(200)
        } else if (RIGHT < LEFT) {
            basic.showArrow(ArrowNames.West)
            right(200)
        }
    } else {
        basic.showArrow(ArrowNames.South)
        forward(500)
    }
})
