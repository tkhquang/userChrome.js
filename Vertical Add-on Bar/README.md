# Vertical Add-on Bar for firefox 60


**Single Column with scrolling**

![Imgur](https://i.imgur.com/XReR5hD.jpg)

**Multiple Columns**

![Imgur](https://i.imgur.com/ViDnQcc.jpg)

![Screen capture gif](https://i.imgur.com/RgxgWbK.gifv)


### Is this really a vertical toolbar?

Well, I wish it was. This is just a userChrome.js hack, to create a toolbar at bottom of navigator toolbox then rotate it -90deg then rotate its items to the right angle we need, so it would look like a vertical toolbar.

### Some other information, for your own customizing

        /*---Something----*//*

        Rules will be ignored

        /*---Something----*/
        
And

        /*---Something----*/

        Rules will be applied

        /*---Something----*/
        
That said. you will stll have to be careful about the opening tags, and closing tags `{  }`, otherwise your custom style would be messed up.

Basically, everything is explained in the script itself, but at least you should change the things in the `:root {}` block to suite your needs.
The default config is for single column, if you want multiple column then you have to change some rules under that (just comment out the rules for single column then remove the `/*` at the beginning of the rules for multiple columns as stated above.

## Issues

Yes there are some issues with the script, if you have anything to improve it just tell me.
Here are some known issues on my end:

1. Sometimes when dragging the buttons in `customzing` from vertical toolbar to the out side, the whole toolbar is dragged outside. But don't worry, just restart the browser and everything will be there again, phewww! I'm not sure if there is a way to prevent it from happening, but since you can just redo it again, no harm done, just inconvenient.

2. Since it's just a hack, the toolbar width is fixed, so it won't do so good it you change the size of the window browser frequently. As a work around, you can disable the toolbar when the window is not maximized.

        #main-window[sizemode="normal"] #content-deck {
        border-right: 0 !important;
        }
        #main-window[sizemode="normal"] #vertical-toolbar-toolbox {
        visibility: collapse!important;
        }
        
