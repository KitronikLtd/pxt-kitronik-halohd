### @activities true
### @explicitHints true

# Halo HD Basic Clock

## Introduction
### Introduction Step @unplugged
Learn how to use the Halo HD's Real Time Clock (RTC) feature to make a fully functioning clock.

![Ticking Halo HD Clock animation](https://KitronikLtd.github.io/pxt-kitronik-halohd/assets/Ticking-Clock-Animation.gif)

### Step 1
First, let's make sure the Halo HD is working correctly with a simple piece of code.
Place the ``||kitronik_halo_hd.set haloDisplay to Halo HD||`` block into the ``||basic:on start||`` section followed by a ``||kitronik_halo_hd.show rainbow||`` block.

#### ~ tutorialhint
```blocks
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
haloDisplay.showRainbow(1, 360)
```

```ghost
haloDisplay.setZipLedColor(0, kitronik_halo_hd.colors(ZipLedColors.Red))
```

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and see the Halo HD display a rainbow of colours!

## The Clock
### The Clock @unplugged
Now we know the Halo HD is working, it's time to code a clock.
The Halo HD has a component that remembers and increments the time. This is called a Real Time Clock (RTC).
The RTC can be controlled from the BBC micro:bit, making it possible to set and read the time (as well as other functions).

### Step 1
Remove the ``||kitronik_halo_hd.show rainbow||`` block from the code.

### Step 2
The Halo HD extension has a block which allows you to set a particular LED to a particular colour.
Place one of these ``||kitronik_halo_hd.set ZIP LED||`` blocks in the ``||basic:forever||`` loop.

#### ~ tutorialhint
```blocks
basic.forever(function () {
	let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
    haloDisplay.setZipLedColor(0, kitronik_halo_hd.colors(ZipLedColors.Red))
})
```

```ghost
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.setZipLedColor(0, kitronik_halo_hd.colors(ZipLedColors.Red))
})
```

### Step 3
Currently, the code will only set LED0 to red. We want this LED to move as the time changes.
Inside the Clock section of the Halo HD extension is the ``||kitronik_halo_hd.read Time for ZIP display||`` block.
Place this inside the ``||kitronik_halo_hd.set ZIP LED||`` block LED number section and change the reading to ``seconds``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
	let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
})
```

```ghost
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
})
```

### Step 4
After setting which LED to turn on, we need to make this actually display. Add the ``||kitronik_halo_hd.show||`` block at the end of the code. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
	let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.show()
})
```

```ghost
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.show()
})
```

### Step 5
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and see the Halo HD increment the seconds!

### Step 6
So, the LEDs are turning on every second, but the previous ones are not turning off.  
Let's change this by adding a ``||kitronik_halo_hd.clear||`` block to the start of the ``||basic:forever||`` loop. 

```ghost
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
basic.forever(function () {
    haloDisplay.clear()
    haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
    haloDisplay.show()
})
```

### Step 7
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and let's see if this has fixed it!

### Step 8
Now we have the seconds working correctly, see if you can create the blocks for showing the hours and minutes...

#### ~ tutorialhint
It's the same blocks, but with different selections on the drop-downs. Maybe change the colours as well...

### Step 9
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and check if the Halo HD is working as a clock!

## Setting the Time
### Setting the Time @unplugged
The Halo HD is ticking the time, but not the right time. Let's use a block to correct that.
Most digital clocks will use buttons for setting the time. In this tutorial we are going to use the micro:bit buttons.

### Step 1
Place an ``||input:on button pressed||`` block in the code and select ``A+B`` from the drop-down.

```ghost
input.onButtonPressed(Button.AB, function () {
	
})
```

### Step 2
From the Halo HD extension Clock section, drag and drop the ``||kitronik_halo_hd.Set Time||`` block into the ``||input:on button pressed||`` slot.

```ghost
input.onButtonPressed(Button.AB, function () {
    kitronik_halo_hd.setTime(0, 0, 0)
})
```

### Step 3
Add the time it will be in two minutes time into the block.

### Step 4
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and press A+B at the same time to set the current time.

### Step 5
Now we have a working clock. Bear in mind that every time you press ``||input:A+B||`` it will set the clock. The next tutorial will show you how to adjust the time with a button interface.