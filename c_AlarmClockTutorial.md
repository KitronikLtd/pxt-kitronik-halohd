### @activities true
### @explicitHints true

# Halo HD Alarm Clock

## Introduction 
### Introduction Step @unplugged
Learn how to set alarms and trigger events with the Halo HD. 

If you have not done the 'Halo HD Basic Clock' and 'Halo HD Adjustable Clock' tutorials, it is recommended that you complete them first.

![Ticking Halo HD Clock animation](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/Ticking-Clock-Animation.gif)

### Step 1
From the first two tutorials, we had the code for setting and displaying the time using the micro:bit button interface. 
Start by familiarising yourself with the program completed at the end of the Adjustable Clock tutorial.

```template
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true) {
        enterNewTime = true
    } else {
        setTimeMode = true
    }
})
input.onButtonPressed(Button.A, function () {
    minutes += 1
})
input.onButtonPressed(Button.B, function () {
    minutes += 10
})
let hours = 0
let minutes = 0
let enterNewTime = false
let setTimeMode = false
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterNewTime = false
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enterNewTime == false) {
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
        enterNewTime = false
        setTimeMode = false
    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

## Setting the Alarm

### Step 1
The clock currently has two modes: "Display Time" and "Set Time". 
We need to add another mode, "Set Alarm", and to do this we need to create a new variable called ``||variables:setAlarmMode||``.
Add it to the ``||basic:on start||`` block and set it to ``||logic:false||`` using the block in the ``||logic:logic||`` section.

#### ~ tutorialhint
```blocks
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterNewTime = false
setAlarmMode = false
```

### Step 2
Just like with the "Set Time" mode, the code needs to be told that we are in "Set Alarm" mode.
All the button press combinations are already in use, so we'll need to be a bit clever...
To start with, place an ``||logic:if else||`` statement in the ``||input:on button B pressed||`` and click the ``||logic:+||`` icon to add an ``||logic:else if||`` statement as well.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    minutes += 10
    if (true) {
        
    } else if (false) {
        
    } else {
        
    }
})
```

### Step 3
Now we need some conditions in our ``||logic:if else||`` statement to enable pressing ``||input:button B||`` to do different things in different modes.
Firstly, we still want it to increment the minutes by 10 if we're setting the time, so put a check in the ``||logic:if||`` section to see if ``||variables:setTimeMode||`` is ``||logic:true||``, and move the ``||variables:change minutes by 10||`` block inside the ``||logic:if||`` section.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        minutes += 10
    } else if (false) {
        
    } else {
        
    }
})
```

### Step 4
Secondly, it makes sense for ``||input:button B||`` to also change the minutes for the "Set Alarm" mode (we'll need a couple of new variables at this point: ``||variables:alarmMinutes||`` and ``||variables:alarmHours||``).
Next, put a check in the ``||logic:else if||`` section to see if ``||variables:setAlarmMode||`` is ``||logic:true||`` and add a ``||variables:change alarmMinutes by 10||`` block inside the ``||logic:else if||`` section.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        minutes += 10
    } else if (setAlarmMode == true) {
        alarmMinutes += 10
    } else {
        
    }
})
```

### Step 5
Finally, we actually want to enter "Set Alarm" mode by pressing ``||input:button B||``, so add a block setting ``||variables:setAlarmMode||`` to be ``||logic:true||`` inside the ``||logic:else||`` section.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        minutes += 10
    } else if (setAlarmMode == true) {
        alarmMinutes += 10
    } else {
        setAlarmMode = true
    }
})
```

### Step 6
Now see if you can make ``||input:button A||`` change the minutes by 1 for both the "Set Time" and "Set Alarm" modes using a similar setup to ``||input:button B||`` (but leave the ``||logic:else||`` section blank for now).

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    if (setTimeMode == true) {
        minutes += 1
    } else if (setAlarmMode == true) {
        alarmMinutes += 1
    } else {
        
    }
})
```

### Step 7
``||input:button B||`` can now be used to increment both ``||variables:minutes||`` and ``||variables:alarmMinutes||`` by 10 and enter "Set Alarm" mode, and ``||input:button A||`` can be used to increment both ``||variables:minutes||`` and ``||variables:alarmMinutes||`` by 1. Once an alarm has been set, it will - at some point - go off, so we need a way to silence it.
Create another new variable called ``||variables:silenceAlarm||``. We will use ``||input:button A||`` to silence alarms, so add a block to the ``||logic:else||`` section setting the ``||variables:silenceAlarm||`` variable to be ``||logic:true||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    if (setTimeMode == true) {
        minutes += 1
    } else if (setAlarmMode == true) {
        alarmMinutes += 1
    } else {
        silenceAlarm = true
    }
})
```

### Step 8
Our final change to the control button interface is to the ``||input:on button A+B pressed||`` block.
We will need to enter a time for both the "Set Time" and "Set Alarm" modes, so add a check to the ``||logic:if||`` statement to enable ``||variables:enterNewTime||`` to be set to ``||logic:true||`` if we are in "Set Time" mode **OR** "Set Alarm" mode.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true || setAlarmMode == true) {
        enterNewTime = true
    } else {
        setTimeMode = true
    }
})
```

### Step 9
The next stage is adding the functionality for a "Set Alarm" mode, which is actually quite simple.
Going back to the ``||basic:forever||`` loop, we need to add an ``||logic:else if||`` section by pressing the ``||logic:+||`` icon, and put a check in the statement to see if we are in "Set Alarm" mode.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enterNewTime == false) {
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
        enterNewTime = false
        setTimeMode = false
    } else if (setAlarmMode == true) {
        
    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

### Step 10
Then, copy all the code from the ``||logic:if||`` section and put in into the ``||logic:else if||`` section. 
We will make some changes in the next few steps to enable alarms to be set.

### Step 11
Go through the code we have just placed in the ``||logic:else if||`` section and replace all uses of the variable ``||variables:minutes||`` with ``||variables:alarmMinutes||``, and all uses of the variable ``||variables:hours||`` with ``||variables:alarmHours||``. This is easily done by changing the selection in the drop-down box.

#### ~ tutorialhint

![Animation that shows how to change variable drop-down](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/change_variable_drop_down.gif)

### Step 12
Now that the variables have been changed, the only other differences between the two sections are after the ``||loops:while||`` loop.
Remove the ``||kitronik_halo_hd.Set Time||``, ``||variables:set enterNewTime to false||`` and ``||variables:set setTimeMode to false||`` blocks.

### Step 13
Inside the Clock section of the Halo HD extension is the ``||kitronik_halo_hd.set alarm||`` block.
Add this after the ``||loops:while||`` loop and insert the ``||variables:alarmHours||`` and ``||variables:alarmMinutes||`` variables into the appropriate slots.
We want this alarm to only go off once, so set the alarm type to ``Single`` and to be ``User`` silenced.

```ghost
kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Single, alarmHours, alarmMinutes, kitronik_halo_hd.AlarmSilence.userSilence)
```

### Step 14
Just like with the "Set Time" mode, we now need to set some variables to be ``||logic:false||``.
Do this for: ``||variables:silenceAlarm||``, ``||variables:enterNewTime||`` and ``||variables:setAlarmMode||``.

## Triggering & Turning Off the Alarm

### Step 1
We now have the ability to set an alarm at a particular hour and minute, but at the moment, nothing will happen when it goes off.
Add the ``||kitronik_halo_hd.on alarm trigger||`` block from inside the Clock section of the Halo HD extension. This block waits until the alarm goes off, and then runs any code which is put inside it. From the ``||music:Music||`` section, add a ``||music:start melody||`` block to run when the alarm triggers. Choose a tune from the drop-down list and have it repeat ``||music:once||``. We also need to set up the music blocks to work on the Halo HD by adding the ``||kitronik_halo_hd.set pitch pin||`` block to the ``||basic:on start||`` block.

#### ~ tutorialhint
```blocks
kitronik_halo_hd.setBuzzerPin()
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
let setTimeMode = false
let enterNewTime = false
let setAlarmMode = false
kitronik_halo_hd.onAlarmTrigger(function () {
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
})
```

### Step 2
The final stage before our alarm clock is complete is to add the functionality to turn off the alarm.
Start by placing an ``||logic:if||`` statement at the end of the ``||basic:forever||`` loop. The condition it needs to check for is if the ``||variables:silenceAlarm||`` variable is ``||logic:true||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (silenceAlarm == true) {
    }
})
```

### Step 3
Now add the ``||kitronik_halo_hd.turn off alarm||`` block from the Clock section of the Halo HD extension inside the ``||logic:if||`` statement, followed by the ``||music:stop melody all||`` block from the ``||music:Music||`` section.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (silenceAlarm == true) {
        kitronik_halo_hd.simpleAlarmOff()
        music.stopMelody(MelodyStopOptions.All)
    }
})
```

### Step 4
Finally, click ``|Download|`` and transfer your code to the Halo HD and try out setting and silencing some alarms.
