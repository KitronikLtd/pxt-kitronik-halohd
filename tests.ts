kitronik_halo_hd.listenForClap(1, 1, function () {
    music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(2000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
kitronik_halo_hd.setTime(12, 14, 0)
kitronik_halo_hd.setDate(22, 10, 19)
kitronik_halo_hd.setBuzzerPin()
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.clear()
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Blue))
    haloDisplay.show()
})