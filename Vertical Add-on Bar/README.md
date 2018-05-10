# Vertical Add-on Bar for firefox 60


**Single Column with scrolling**

![Imgur](https://i.imgur.com/XReR5hD.jpg)

**Multiple Columns**

![Imgur](https://i.imgur.com/ViDnQcc.jpg)

[Screen capture gif](https://i.imgur.com/RgxgWbK.gifv)


### Is this really a vertical toolbar?

Well, I wish it was. This is just a userChrome.js hack, to create a toolbar at bottom of navigator toolbox, rotate it -90deg then rotate its items to the right angle we need, so it would look like a vertical toolbar.

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
The default config is for single column, if you want multiple column then you have to change some rules under that (just comment out the rules for single column then remove the `/*` at the beginning of the rules for multiple columns as stated above.

## Issues

Yes there are some issues with the script, if you have anything to improve it just tell me.
Here are some known issues on my end:

1. Sometimes when dragging the buttons in `customzing` from vertical toolbar to the out side, the whole toolbar is dragged outside. But don't worry, just restart the browser and everything will be there again, phewww! I'm not sure if there is a way to prevent it from happening, but since you can just redo it again, no harm done, just inconvenient.

2. Since it's just a hack, the toolbar width is fixed, so it won't do so good if you change the size of the window browser frequently. As a workaround, you can disable the toolbar when the window is not maximized.

        #main-window[sizemode="normal"] #content-deck {
        border-right: 0 !important;
        }
        #main-window[sizemode="normal"] #vertical-toolbar-toolbox {
        visibility: collapse!important;
        }
        
### What is the `vertical_addonbar_m2.uc.js` file?

That script is to create a toolbar that is actually vertical, you can put it before the left sidebar, or at the end of the left screen just like the main file. But since it's put there, I can't seem to find a way to drag the toolbarbutton onto it, and it's not visible when we go into `Customize` tab either. So it's useless? Not really, you can use [this method](http://forums.mozillazine.org/viewtopic.php?f=38&t=3037911 ) to put items on it (of course you have to get the id of the buttons yourself), so not good at all.

Alternately, you can replace the main file (after the you have put the items you want to the toolbar) with this file. Since I've made the 2 scripts that create the toolbars which share the same id, after replacing the file, the items are gonna stay there.

**By the way, ONLY use ONE of the 2 files at a time.**
