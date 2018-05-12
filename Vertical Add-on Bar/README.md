# Vertical Add-on Bar for firefox 60


**Single Column**

![Imgur](https://i.imgur.com/XReR5hD.jpg)

**Single Column (Left side)**

![Imgur](https://i.imgur.com/2MDNmc0.jpg)

**Multiple Columns**

![Imgur](https://i.imgur.com/ViDnQcc.jpg)

[Screen capture gif](https://i.imgur.com/RgxgWbK.gifv)



Before starting, make sure you have your Firefox working fine with `.uc.js` files.
You can find more infomation about the `userChrome.js` on these links: [Firefox Quantum compatible userChrome.js](https://github.com/nuchi/firefox-quantum-userchromejs), [How to add userChrome.js support with just css](https://www.reddit.com/r/FirefoxCSS/comments/7jj3uy/how_to_add_userchromejs_support_with_just_css/) (*this is the method which I'm using by the way*). [This](https://www.reddit.com/r/FirefoxCSS/comments/73dvty/tutorial_how_to_create_and_livedebug_userchromecss/) might be helpful if you want to use the userChrome.css method.

The script was tested on Firefox 60 stable build, if you're on Nightly then I'm not sure.

[Right + Single column only](https://github.com/tkhquang/userChrome.js/blob/master/Vertical%20Add-on%20Bar/vertical_addonbar_single_right.uc.js)

[Left + Single column only](https://github.com/tkhquang/userChrome.js/blob/master/Vertical%20Add-on%20Bar/vertical_addonbar_single_left.uc.js)

[Right + Multi columns on window maximized](https://github.com/tkhquang/userChrome.js/blob/master/Vertical%20Add-on%20Bar/vertical_addonbar_multi_right.uc.js)

[Left + Multi columns on window maximized](https://github.com/tkhquang/userChrome.js/blob/master/Vertical%20Add-on%20Bar/vertical_addonbar_multi_left.uc.js)

### Is this really a vertical toolbar?

Well, I wish it was. This is just a userChrome.js hack, to create a toolbar at bottom of navigator toolbox, rotate it 90deg then rotate its items to the right angle we need, so it would look like a vertical toolbar.

### Some other information, for your own customizing

        /*---Comment----*//*

        Rules will be ignored

        /*---Comment----*/
        
And

        /*---Comment----*/

        Rules will be applied

        /*---Comment----*/
        
That said. you will stll have to be careful about the opening tags, and closing tags `{  }`, otherwise your custom style would be messed up.

Basically, everything is explained in the script itself, but at least you should change the things in the `:root {}` block to suite your needs.

The default config is for single column, if you want multiple columns then you have to change some rules under that (just comment out the rules for single column then remove the `/*` at the beginning of the rules for multiple columns as stated above.

## Issues

Yes there are some issues with the script, if you have anything to improve it just tell me.
Here are some known issues on my end:

1. Sometimes when dragging the buttons in `customzing` from vertical toolbar to the out side, the whole toolbar is dragged outside. But don't worry, just restart the browser and everything will be there again, phewww! I'm not sure if there is a way to prevent it from happening, but since you can just redo it again, no harm done, just inconvenient.

2. I can't seem to find a way for multiple columns to work fine when the height of the toolbar changes dynamically, so I just make multiple columns appear on the browser window maximized only. When not, it becomes a single column one.

You can just disable the toolbar when the window is not maximized.

Replace (or remove if `#main-window[sizemode="maximized"] #content-deck` already there)

          #content-deck {
          border-right: calc(var(--vertical-toolbar-width) * var(--vertical-toolbar-col-overflow)) solid var(--vertical-toolbar-color) !important;
          }

with these lines (if you're using left side toolbar, it's `border-left` instead)

          #main-window[sizemode="maximized"] #content-deck {
          border-right: calc(var(--vertical-toolbar-width) * var(--vertical-toolbar-col-overflow)) solid var(--vertical-toolbar-color) !important;
          }

and add this

          #main-window[sizemode="normal"] #vertical-toolbar-toolbox {
          visibility: collapse!important;
          }


## About the file `vertical_addonbar_testing.uc.js`

That script is to create a toolbar that is actually vertical, you can put it before the left sidebar, or at the end of the left screen just like the main file. But I can't seem to find a way to drag the toolbarbutton onto it, and it's not visible when we go into `Customize` tab either. So it's useless? Not really, you can use [this method](http://forums.mozillazine.org/viewtopic.php?f=38&t=3037911 ) to put items on it (of course you have to get the id of the buttons yourself), so not good at all.

Alternately, you can replace the main file (after the you have put the items you want to the toolbar) with this file. Since I've made the 2 scripts that create the toolbars which share the same id, after replacing the file, the items are gonna stay there.

**By the way, ONLY use ONE of the files at a time.**
