# Vertical Add-on Bar for firefox 60


**Single Column**

![Imgur](https://i.imgur.com/XReR5hD.jpg)

**Single Column (Left side)**

![Imgur](https://i.imgur.com/2MDNmc0.jpg)

**Multiple Columns**

![Imgur](https://i.imgur.com/ViDnQcc.jpg)

[Screen capture gif](https://i.imgur.com/RgxgWbK.gifv)


### Is this really a vertical toolbar?

Well, I wish it was. This is just a userChrome.js hack, to create a toolbar at bottom of navigator toolbox, rotate it -90deg then rotate its items to the right angle we need, so it would look like a vertical toolbar.

### Can I put it on the left side?
Yes, use the [`vertical_addonbar_left.uc.js`](https://github.com/tkhquang/userChrome.js/blob/master/Vertical%20Add-on%20Bar/vertical_addonbar_left.uc.js).

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

2. Since it's just a hack, the toolbar width is fixed, so it won't do so good if you change the size of the window browser frequently. As a workaround, you can add these lines before the `})();` at the end of the script if you just use single column with scrolling, this will set the height of the toolbar dynamically whenever the window is resized. Then, remove all the lines that have `--vertical-toolbar-height` inline. This may cause issue if you use multiple columns, I'm still thinking about a way to fix this.

        window.addEventListener("resize", function() {
            var newHeight = document.getElementById("content-deck").clientHeight;
            document.getElementById("vertical-toolbar-toolbox").style.width = newHeight + "px";
        });

[This](https://gist.github.com/tkhquang/4330b7042a2275914f1b0f66959c7ef1) is what it should look like in the end. However, when you toggle another toolbar, like menubar or bookmark bar, obviously, the height of the vertical toolbox should be changed, but in this case it wont, because the above code is just for window resize observation. You can, however, make everything work fine by replacing the above code with these lines:
    
        var setHeight = function setHeight(){
            document.getElementById("vertical-toolbar-toolbox").style.width = document.getElementById("content-deck").clientHeight + "px";
        };
    
        function observeHeightChange(elm, callback){
            var lastHeight = elm.clientHeight, newHeight;
            (function run(){
                newHeight = elm.clientHeight;
                if( lastHeight != newHeight ) {
                    callback();
                    lastHeight = newHeight;
                }
                if( elm.observeHeightChangeTimer ) {
                    clearTimeout(elm.observeHeightChangeTimer);
                }
                elm.observeHeightChangeTimer = setTimeout(run, 200);
            })();
        }
    
        observeHeightChange(document.getElementById("content-deck"), setHeight);

While it indeed works ok, the script is running constantly and not good for performance, so I'd say this is just a workaround for the issue.

========

Or, you can just disable the toolbar when the window is not maximized.

Replace

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
        
### What is the `vertical_addonbar_m2.uc.js` file?

That script is to create a toolbar that is actually vertical, you can put it before the left sidebar, or at the end of the left screen just like the main file. But since it's put there, I can't seem to find a way to drag the toolbarbutton onto it, and it's not visible when we go into `Customize` tab either. So it's useless? Not really, you can use [this method](http://forums.mozillazine.org/viewtopic.php?f=38&t=3037911 ) to put items on it (of course you have to get the id of the buttons yourself), so not good at all.

Alternately, you can replace the main file (after the you have put the items you want to the toolbar) with this file. Since I've made the 2 scripts that create the toolbars which share the same id, after replacing the file, the items are gonna stay there.

**By the way, ONLY use ONE of the 2 files at a time.**
