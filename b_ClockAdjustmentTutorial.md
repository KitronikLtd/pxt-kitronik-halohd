### @activities true
### @explicitHints true

# Halo HD Adjustable Clock

## Introduction 
### Introduction Step @unplugged
Learn how to make a clock interface to change and set the time with the Halo HD. 

If you have not done the 'Halo HD Basic Clock' tutorial, it is recommended that you complete it first.

![Ticking Halo HD Clock animation](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/Ticking-Clock-Animation.gif)

### Step 1
From the first tutorial, we had the code for displaying the time. 
Start by recreating that program, but remove the ``||kitronik_halo_hd.Set Time||`` block from the ``||input:on button pressed||`` block.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    
})
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.clear()
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
    haloDisplay.show()
})
```

## Changing Minutes

### Step 1
Next, two variables are required for the interface for setting the time.
Create one variable called ``||variables:setTimeMode||`` and another called ``||variables:enterNewTime||``. Add them to the ``||basic:on start||`` block and set them to ``||logic:false||`` using the block in the ``||logic:logic||`` section.

#### ~ tutorialhint
```blocks
let setTimeMode = false
let enterNewTime = false
```

### Step 2
The code needs to be told that we are in "Set Time" mode.  
To do this, place an ``||logic:if else||`` statement in the ``||input:on button A+B pressed||`` to check if ``||variables:setTimeMode||`` equals ``||logic:true||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true) {
    	
    } else {
    	
    }
})
```

### Step 3
Each section of the ``||logic:if else||`` statement needs to set one of our new variables to be ``||logic:true||``.
The code needs to be: if ``||variables:setTimeMode||`` is ``||logic:true||``, set ``||variables:enterNewTime||`` to ``||logic:true||``, else ``||variables:setTimeMode||`` to ``||logic:true||``.
So, if the program is in the "setTime" mode, the ``||input:A+B||`` button press will confirm and enter the new time settings.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true) {
        enterNewTime = true
    } else {
        setTimeMode = true
    }
})
```

### Step 4
Going back to the ``||basic:forever||`` loop, we need to add an ``||logic:if else||`` statment to check if we are in "Set Time" mode.
The ``||logic:if||`` statement needs to check whether ``||variables:setTimeMode||`` equals ``||logic:true||``, ``||logic:else||`` run the code for displaying the time.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    if (setTimeMode == true) {

    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

### Step 5
Next, we need to create two more variables: ``||variables:minutes||`` and ``||variables:hours||``. These will be the values for setting the new time.

### Step 6
The new variable ``||variables:minutes||`` needs to be set to the current minute reading on the clock. Inside the Clock section of the Halo HD extension, there is a ``||kitronik_halo_hd.read Time as Number||`` block. Set ``||variables:minutes||`` to be equal to this and select ``||kitronik_halo_hd.minutes||`` from the drop-down.
Place the ``||variables:set minutes||`` block into the first slot of the ``||logic:if else||`` statement in the ``||basic:forever||`` loop.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
    } 
})
```

### Step 7
See if you can create the blocks that read and set the hours...

#### ~ tutorialhint
It's the same blocks, but with different selections on the drop-downs.
```blocks
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
    } 
})
```

### Step 8
As the RTC is setup in 24 hour mode, we also need to add in a quick check at this point to make sure we don’t try and display 24 hour time on a 12 hour clock!
Use an ``||logic:if||`` statement to check whether the read ``||variables:hours||`` is greater than or equal to 12, and if it is, take 12 from it’s value.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
    } 
})

```

### Step 9
Now that we have the current minutes and hours stored as variables, we can change their values and use them to set a new time.
Whilst we are setting a new time, the Halo HD needs to display the values we are changing, until we confirm the new settings.
To do this, add a ``||loops:while||`` loop after the ``||variables:set hours||`` block.
The loop should continue while ``||variables:enterNewTime||`` is ``||logic:false||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (setTimeMode == true) {
        minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enterNewTime == false) {

        }
    }
})
```

### Step 10
In the loop, we need to display the time values we are changing. The code is very similar to our clock display code.
See if you can remember how we did that, and then modify the code to display our variables.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    while (enterNewTime == false) {
            haloDisplay.clear()
            haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(hours, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
    }
})
```

### Step 11
Now there needs to be a way to increment the ``||variables:minutes||`` value. We will do this with the ``||input:on button A pressed||`` block.
Make it change the ``||variables:minutes||`` variable by 1 each time.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    minutes += 1
})
```

### Step 12
Only increasing the ``||variables:minutes||`` by 1 could make setting the time a very long process; it would be nice to have a much quicker way.
Using the ``||input:on button B pressed||`` block, see if you can make the ``||variables:minutes||`` variable change by 10.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    minutes += 10
})
```

### Step 13
To make sure the micro:bit has time to check for the button presses, a short ``||basic:pause||`` of 1ms needs to be added to the end of the ``||loops:while||`` loop.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    while (enterNewTime == false) {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(hours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
        basic.pause(1)
    }
})
```

### Step 14
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Test the code by pressing ``||input:A+B||`` to get into time setting mode and using the ``||input:A||`` and ``||input:B||`` buttons to change the ``||variables:minutes||`` value.

#### ~ tutorialhint
Test what happens when the ``||variables:minutes||`` value is increased beyond the next hour.

## Setting the Time

### Step 1
Did you set the minutes past the hour? You might have noticed that the LED disappears.
This is because the value of ``||variables:minutes||`` becomes greater than the number of LEDs on the Halo HD.
To correct this, we can use an ``||logic:if||`` statement to check if ``||variables:minutes||`` is greater than... which number do you think?
Place this ``||logic:if||`` statement at the start of the ``||loops:while||`` loop.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    while (Enter == false) {
        if (minutes > 59) {

        }
        haloDisplay.clear()
        haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(hour, kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

### Step 2
Now we have the check in place, the ``||variables:minutes||`` variable needs to be set back to 0 when the condition is met.
Add the appropriate block inside the ``||logic:if||`` statement.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    while (Enter == false) {
        if (minutes > 59) {
            minutes = 0
        }
        haloDisplay.clear()
        haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(hour, kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

### Step 3
Since ``||variables:minutes||`` has gone past the hour and been set back to 0, that means that the hour must have changed as well.
Add a block to the ``||logic:if||`` statement to change the ``||variables:hours||`` variable by 1.

#### ~ tutorialhint
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.forever(function () {
    while (Enter == false) {
        if (minutes > 59) {
            minutes = 0
            hours += 1
        }
        haloDisplay.clear()
        haloDisplay.setZipLedColor(minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(hour, kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
})
```

### Step 4
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Again, test the code by going into time setting mode and increasing the value of ``||variables:minutes||``.

#### ~ tutorialhint
Test what happens now when we increase to the next hour.

### Step 5
At the moment, when we increase the ``||variables:minutes||`` and cause the ``||variables:hours||`` to move forward, the ``||variables:hours||`` only move on by a single ZIP LED. This is not correct, as the hour marks on the Halo HD are actually every 5 ZIP LEDs. This is easy to fix. In the block where we set the ZIP LED for the ``||variables:hours||``, change it so it reads: 
```blocks
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
haloDisplay.setZipLedColor(hour * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
```

```ghost
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
haloDisplay.setZipLedColor(hour * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
```

### Step 6
Just as the ``||variables:minutes||`` need resetting when they pass the 59th minute, the ``||variables:hours||`` needs resetting when they pass the 11th hour.
See if you can add the code to reset the ``||variables:hours||`` back to 0. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (minutes > 59) {
        minutes = 0
        hour += 1
        if (hour == 12) {
            hour = 0
        }
    }
})
```

### Step 7

Once we have reached the time we want to set, pressing ``||input:buttons A+B||`` will exit the ``||loops:while||`` loop. Now we need to save this new time to the Halo HD.
Inside the Clock section of the Halo HD extension, there is a ``||kitronik_halo_hd.Set Time||`` block. Add this after the ``||loops:while||`` loop and insert the ``||variables:hours||`` and ``||variables:minutes||`` variables into the appropriate fields.
Finally, we just need to set ``||variables:enterNewTime||`` and ``||variables:setTimeMode||`` back to false (this is to make sure the code does not loop back around into "Set Time" mode again and displays the new time instead).

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kitronik_halo_hd.setTime(hours, minutes, 0)
    enterNewTime = false
    setTimeMode = false
})
```

### Step 8
CODING COMPLETE! Let's click ``|Download|`` and transfer your code to the Halo HD and enjoy a colourful clock with time setting functionality.
