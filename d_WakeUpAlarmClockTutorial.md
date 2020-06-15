### @activities true
### @explicitHints true

# Halo HD Wake Up Light Alarm Clock

## Introduction 
### Introduction Step @unplugged
Learn how to create a bedside clock which gently fills the room with light as wake up time approaches. 

If you have not done the 'Halo HD Basic Clock', 'Halo HD Adjustable Clock' & 'Halo HD Alarm Clock' tutorials, it is recommended that you complete them first.

![Ticking Halo HD Clock animation](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/Ticking-Clock-Animation.gif)

### Step 1
This tutorial carries on from the 'Halo HD Alarm Clock' tutorial, so the code from the end of that tutorial has been provided as a starting point here.

```template
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true || setAlarmMode == true) {
        enterTime = true
    } else {
        setTimeMode = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (setTimeMode == true) {
        minutes += 1
    } else if (setAlarmMode == true) {
        alarmMinutes += 1
    } else {
        silenceAlarm = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        minutes += 10
    } else if (setAlarmMode == true) {
        alarmMinutes += 10
    } else {
        setAlarmMode = true
    }
})
kitronik_halo_hd.onAlarmTrigger(function () {
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
})
let alarmHours = 0
let hours = 0
let silenceAlarm = false
let alarmMinutes = 0
let minutes = 0
let setAlarmMode = false
let enterTime = false
let setTimeMode = false
kitronik_halo_hd.setBuzzerPin()
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterTime = false
setAlarmMode = false
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enterTime == false) {
            if (minutes > 59) {
                minutes = 0
                hours += 1
                if (hours == 12) {
                    hours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(hours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.setTime(hours, minutes, 0)
        enterTime = false
        setTimeMode = false
    } else if (setAlarmMode == true) {
        alarmMinutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        alarmHours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (alarmHours >= 12) {
            alarmHours += -12
        }
        while (enterTime == false) {
            if (alarmMinutes > 59) {
                alarmMinutes = 0
                alarmHours += 1
                if (alarmHours == 12) {
                    alarmHours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(alarmMinutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(alarmHours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Single, alarmHours, alarmMinutes, kitronik_halo_hd.AlarmSilence.userSilence)
        silenceAlarm = false
        enterTime = false
        setAlarmMode = false
    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
    if (silenceAlarm == true) {
        kitronik_halo_hd.simpleAlarmOff()
        music.stopMelody(MelodyStopOptions.All)
    }
})
```

## Increasing Brightness

### Step 1
Rather than the simple tune playing as an alarm, this time we want to use the lights on the Halo HD as a Wake Up Light alarm.
Wake Up Lights are a simulation of the sun rising and light getting brighter outside, which makes waking up more natural.
To get started, make two new variables: ``||variables:alarmRunning||`` and ``||variables:wakeUpBrightness||``. Set ``||variables:alarmRunning||`` to be ``||logic:false||`` in the ``||basic:on start||`` block.

#### ~ tutorialhint
```blocks
kitronik_halo_hd.setBuzzerPin()
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterTime = false
setAlarmMode = false
alarmRunning = false
```

### Step 2
In the ``||basic:forever||`` loop, change the ``||kitronik_halo_hd.set alarm||`` block so that it is now a ``Daily Repeating`` alarm which is ``Auto`` silenced, and set ``||variables:wakeUpBrightness||`` to be 0.

#### ~ tutorialhint
```blocks
basic.forever(function () {
	kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Repeating, alarmHours, alarmMinutes, kitronik_halo_hd.AlarmSilence.autoSilence)
	silenceAlarm = false
	enterTime = false
	setAlarmMode = false
	wakeUpBrightness = 0
})
```

### Step 3
Next, remove the extra ``||logic:if||`` statement at the end of the ``||basic:forever||`` loop checking whether ``||variables:silenceAlarm||`` is ``||logic:true||``.

### Step 4
Now we need to change what happens when the alarm triggers. To make things easier, temporarily remove the ``||music:start melody||`` block from inside the ``||kitronik_halo_hd.on alarm trigger||`` block.

#### ~ tutorialhint

![Animation that shows how to remove a block and put in the background](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/remove_block_alarm.gif)

### Step 5
This is where we use our ``||variables:alarmRunning||`` variable. Set it to be ``||logic:true||`` at the start of the ``||kitronik_halo_hd.on alarm trigger||`` block, and ``||logic:false||`` at the end (the rest of our code will go inbetween). This variable will be able to tell us at any point whether the alarm is triggered or not. The next step will show why this is important...

#### ~ tutorialhint
```blocks
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    alarmRunning = false
})
```

### Step 6
Our Wake Up Light alarm will make use of all the Halo HD LEDs, which means the time will not be able to display while they are in use. To make sure there is no clash in the code, we need to check whether the alarm is triggered at some point in the ``||basic:forever||`` loop. In the ``||logic:else||`` section, put all the code inside it in an ``||logic:if||`` statement checking whether ``||variables:alarmRunning||`` is ``||logic:false||``. This way, the time display code will only run when the alarm is not triggered.

#### ~ tutorialhint

![Animation that shows how to add an if statement to existing blocks](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/add_alarm_running_check.gif)

### Step 7
Back to the alarm triggering; time to add in the light control. For a Wake Up Light, the LEDs need to start off and gradually increase in brightness. 
To do this, we will use another ``||loops:while||`` loop, which should continue to run while ``||variables:wakeUpBrightness||`` is less than 255.

#### ~ tutorialhint
```blocks
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        
    }
    alarmRunning = false
})
```

### Step 8
Inside our new ``||loops:while||`` loop, start by adding the ``||kitronik_halo_hd.set brightness||`` block from the ZIP LEDs section of the Halo HD extension, and then set the brightness to the variable ``||variables:wakeUpBrightness||``. 

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
    }
    alarmRunning = false
})
```

### Step 9
Next, use the ``||kitronik_halo_hd.show color||`` block from the ZIP LEDs section of the Halo HD extension to display all the LEDs white, and then add a 100ms ``||basic:pause||`` followed by a ``||variables:change wakeUpBrightness by 1||`` block.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.White))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    alarmRunning = false
})
```

### Step 10
Finally, remember that ``||music:start melody||`` block we removed earlier? Drag that back into the ``||kitronik_halo_hd.on alarm trigger||`` block just after the ``||loops:while||`` loop.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.White))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    alarmRunning = false
})
```

### Step 11
If you have a @boardname@ connected, click ``|Download|`` to transfer your code, set another alarm and check the brightening lights work.

## Coding a Sunrise

### Introduction Step @unplugged
We now have an alarm that gradually gets brighter when it triggers, but the light is very harsh, and doesn't really replicate dawn very well. What we need to do is to code a sunrise.

### Step 1
If you look at a sunrise, you'll see that it starts with much more red light, and as it gets brighter, more blue light comes in.
To simulate this, we're going to start by displaying orange, progress through to yellow, and finish with white. 
To get started, change the ``||kitronik_halo_hd.show color||`` block in the ``||kitronik_halo_hd.on alarm trigger||`` section to display ``||kitronik_halo_hd.orange||`` rather than ``||kitronik_halo_hd.white||``.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    alarmRunning = false
})
```

### Step 2
Then we need to temporarily remove the ``||music:start melody||`` and ``||variables:set alarmRunning to false||`` blocks, just like before.

#### ~ tutorialhint

![Animation that shows how to remove multiple blocks and put in the background](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/remove_block_alarm_2.gif)

### Step 3
Now we need to create two new variables, ``||variables:green||`` and ``||variables:blue||``. These will be used for the ZIP LED colour settings.
Just after the ``||loops:while||`` loop in the ``||kitronik_halo_hd.on alarm trigger||`` block, set ``||variables:green||`` to be 165 and ``||variables:blue||`` to be 0. (With red at 255, this RGB colour combination will form orange).

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
})
```

### Step 4
Next, add a second ``||loops:while||`` loop, one that continues while ``||variables:green||`` is less than 255. 

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        
    }
})
```

### Step 5
Inside the new ``||loops:while||`` loop, add a ``||kitronik_halo_hd.show color||`` block displaying a colour set by the RGB values block. Set the ``red`` value to 255, the ``green`` value to the variable ``||variables:green||`` and the ``blue`` value to the variable ``||variables:blue||``.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
    }
})
```

### Step 6
The final things to add to ``||loops:while||`` loop is a 50ms ``||basic:pause||`` and a block to ``||variables:change green by 1||``.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        green += 1
    }
})
```

### Step 7
Repeat the previous three steps, but this time the ``||loops:while||`` loop should continue while the value of ``||variables:blue||`` is less than 255, and it should also be ``||variables:blue||`` which should change by 1 at the end of the loop.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        green += 1
    }
    while (blue < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        blue += 1
    }
})
```

### Step 8
Finally, drag the ``||music:start melody||`` and ``||variables:set alarmRunning to false||`` blocks we removed earlier back into the ``||kitronik_halo_hd.on alarm trigger||`` block just after the third ``||loops:while||`` loop.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
kitronik_halo_hd.onAlarmTrigger(function () {
    alarmRunning = true
    while (wakeUpBrightness < 255) {
        haloDisplay.setBrightness(wakeUpBrightness)
        haloDisplay.showColor(kitronik_halo_hd.colors(ZipLedColors.Orange))
        basic.pause(100)
        wakeUpBrightness += 1
    }
    green = 165
    blue = 0
    while (green < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        green += 1
    }
    while (blue < 255) {
        haloDisplay.showColor(kitronik_halo_hd.rgb(255, green, blue))
        basic.pause(50)
        blue += 1
    }
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    alarmRunning = false
})
```

### Step 9
We've done it! A full sunrise simulation alarm clock. ``|Download|`` your code and transfer it to your Halo HD and try it out.
