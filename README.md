# BETA - TESTING ON THIS EXTENSION IS NOT COMPLETE

# pxt-kitronik-halohd

# Kitronik blocks for micro:bit

Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)
This package is for the [Kitronik :VIEW Halo HD]

# HaloHD Blocks
Set buzzer pin block is to change to default music pin to allocated pin on the Halo HD board
```blocks
kitronik_halo_hd.setBuzzerPin()
```

# ZIP LEDs Blocks
Allocates a variable to the number of ZIP LED's to allow use of the LEDs
```blocks
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
```

Show colour block will set all the ZIP LED's to thesame colour
```blocks
haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Red))
```

Show block will output to the ZIP LEDs
```blocks
haloDisplay.show()
```

Show raindow block will output a raindow spectrum across all the ZIP LEDs
```blocks
haloDisplay.showRainbow(1, 360)
```

Clear block will clear any illuminated ZIP LEDs
```blocks
haloDisplay.clear()
```

Set the brightness of all the ZIP LEDs
```blocks
haloDisplay.setBrightness(255)
```

Set the brightness of all the ZIP LEDs
```blocks
haloDisplay.rotate(1)
```

RGB block allows the user to show any colour from setting different levels or red, green and blue between 0 and 255
```blocks
haloDisplay.setZipLedColor(15, kitronik_halo_hd.rgb(255, 255, 255))
```

Range block will allow the user to select a range of ZIP LED's to show a particular colour or other requirements
```blocks
haloDisplay.range(0, 30).showColor(kitronik_halo_hd.colors(ZipLedColors.Red))
```

Show Bar Graph will plot an input from 0 to 255 and display on the ZIP LED's
```blocks
haloDisplay.showBarGraph(kitronik_halo_hd.readSoundLevel(), 255)
```

# Microphone blocks
Read sound level block will take an anolgue reading of the current sound level and return as a number
```blocks
basic.showNumber(kitronik_halo_hd.readSoundLevel())
```

Read sound level block will take five readings of the sound level, calculate the average and return as a number
```blocks
basic.showNumber(kitronik_halo_hd.readAverageSoundLevel())
```

Listen for clap will listen for stated number of claps within a defined time period (between 1 and 10 seconds), once detected the code will execute
```blocks
kitronik_halo_hd.listenForClap(1, 1, function () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
```

# Clock Blocks
Set Time Blocks
These groups of blocks will set the time to the RTC chip. This can be done in either one block for hours,minutes and seconds or set individually
```blocks
kitronik_halo_hd.setTime(22, 04, 00)
kitronik_halo_hd.writeHours(22)
kitronik_halo_hd.writeMinutes(04)
kitronik_halo_hd.writeSeconds(00)
```

Set Date Blocks
These groups of blocks will set the date to the RTC chip. This can be done in either one block for day,month,year (DD/MM/YY) or set individually
```blocks
kitronik_halo_hd.setDate(12, 11, 55)
kitronik_halo_hd.writeDay(12)
kitronik_halo_hd.writeMonth(11)
kitronik_halo_hd.writeYear(55)
```

Read Time Blocks
These blocks will allow to read the current time either as a string or individually as a number
```blocks
basic.showString(kitronik_halo_hd.readTime())
basic.showNumber(kitronik_halo_hd.readTimeParameter(TimeParameter.Hours))
basic.showNumber(kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes))
basic.showNumber(kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds))
```

Read Time For ZIP Display
This block will allow to take the time reading from the RTC and format it to be able to show on the zip display
```blocks
haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Red))
haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Blue))
haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Green))
```

Read Date Blocks
These blocks will allow to read the current date either as a string or individually as a number
```blocks
basic.showString(kitronik_halo_hd.readDate())
basic.showNumber(kitronik_halo_hd.readDateParameter(DateParameter.Hours))
basic.showNumber(kitronik_halo_hd.readDateParameter(DateParameter.Minutes))
basic.showNumber(kitronik_halo_hd.readDateParameter(DateParameter.Seconds))
```

Set Alarm Block
The set alarm block allows the user to input a time for an alarm to trigger on either single time or daily.  The alarm can either be silenced by the user or automatically
```blocks
kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Single, 12, 45, kitronik_halo_hd.AlarmSilence.autoSilence)
```

Simple alarm check
This block is a simple true or false check if the alarm has gone off
```blocks
if (kitronik_halo_hd.simpleAlarmCheck()) {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
```	

Simple Alarm Off
This block allows the user to turn off the alarm	
```blocks
kitronik_halo_hd.simpleAlarmOff()
```

On Alarm Trigger
This block allows a section of code to be run when the alarm has been trigger
```blocks
kitronik_halo_hd.onAlarmTrigger(function () {
    music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
})
```