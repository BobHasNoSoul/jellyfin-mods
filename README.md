# jellyfin-mods
This is just a guide for various modifications and dumping ground for jellyfin mods i have been kicking around so i dont have to make a new jftool for every platform and revision when they change one single thing that can break it for those that cant or dont want to recompile (yes recompiling would be the way forward but it is not for everyone)

#### Please note this is if you do not want or are unable to compile the web client yourself.. there are better ways of doing these mods but if you insist here is the way to run at it. (not preaching its your server after all :D )



---

## Force backdrops for all users (10.7.x)

Modify this string in your main.Xxxxxxxxxx.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableBackdrops:function(){return _}

Change it to

    enableBackdrops:function(){return x}

Save and clear cache reload on clients

*** If you cannot find it (because of regex in search like in nano) try searching for `enableBackdrops:function` this should give you the ability to find the string above ***

---

## Change splash logo 
besides changing the logo image in the web root files location (/usr/share/jellyfin/web/assets/img/ banner-light.png and icon-transparent.png) which is easy but stops them being animated you can modify index.html to add in your own image or custom gif personally i use a gif that is animated to pulse with my server "BlueBoxOfDOOM" logo

to do this find this string but add what ever you like in where the icon-transparent.png is i.e. if you have a gif in your web root just replace "assets/img/icon-transparent.png" with mygif.gif (this assumes that your gif is named mygif.gif) 

    background-image: url(assets/img/icon-transparent.png);

and then replace the other instance in the splashlogo that is originally this string:

    background-image: url(assets/img/banner-light.png)
    
you can even direct it outside of your host to any other host by changing the part inside the brackets to a full form url e.g. https://media.tenor.com/images/f0e22aca6a9498ce63497ca56fb49602/tenor.gif for that cool 80s rick roll feeling or you can go more proffesional looking... i dont care, its not my server.. your the one modding and using it.



---

## Change font to whatever you want
firstly get a font pack.. there are many out there.. seriously many so take the next few mins to look for the one you like the look of and download the font pack (you can get some from https://google-webfonts-helper.herokuapp.com/fonts/ or from other sources) and unzip it into a new folder you will be making in the web root called "fonts" (your font pack should contain woff woff2 tff eot and svg files). for this example i used the ubuntu font (dont judge me). You can get the same font from here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular this will work out the box with the following example extract the woff etc into the following directory:

    /usr/share/jellyfin/web/fonts/

once you have the files in there simply add the following to your css (rename them for your files in turn unless using the linked pack)

    /* ubuntu-regular - latin */
    @font-face {
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 400;
      src: url('/web/fonts/ubuntu-v15-latin-regular.eot'); /* IE9 Compat Modes */
      src: local(''),
           url('/web/fonts/ubuntu-v15-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
           url('/web/fonts/ubuntu-v15-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
           url('/web/fonts/ubuntu-v15-latin-regular.woff') format('woff'), /* Modern Browsers */
           url('/web/fonts/ubuntu-v15-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
           url('/web/fonts/ubuntu-v15-latin-regular.svg#Ubuntu') format('svg'); /* Legacy iOS */
    }
    html { font-family: "Ubuntu" !important;}

Easy mode copy paste commands for ubuntu font.. you can use this as a guide to do this for other fonts too if you like

    cd /usr/share/jellyfin/web/
    sudo mkdir fonts
    sudo wget https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular

that wget might do what looks like an error [1] [2] but just ignore that and press ctrl+c and go to the next command

    sudo mv ubuntu-mono* fonts/ubuntu.zip
    sudo unzip fonts/ubuntu.zip
    
and your font is now where it should be, just modify the css to suit different names of fonts




---

## Login Background that changes every 10 seconds and reload

(yes all images can also be changed for whatever you like or even add more or less depending on use case) here are some examples.

![1](https://user-images.githubusercontent.com/23018412/114848291-75cf1580-9dd6-11eb-982c-02c1829785aa.PNG)
![2](https://user-images.githubusercontent.com/23018412/114848300-78ca0600-9dd6-11eb-8120-174a7d22f3ab.PNG)
![3](https://user-images.githubusercontent.com/23018412/114848306-79fb3300-9dd6-11eb-8880-ecdba1b47650.PNG)

this one was just a quick javascript and some files for backgrounds that will let a user be more impressed by certain content you can decide to showcase for that please visit the repo i made http://git.bbod.tk/BobHasNoSoul/jellyfin-fanartbackground it explains it in full and has some screen shots and all required files to download. (including some simple copy paste commands to install it)

---

## Adding logo to sidebar

![logosidebar](https://camo.githubusercontent.com/ffd52556715cd72021af339118fe1bb3466b7686c3d75bd473c694d0ff1228a3/68747470733a2f2f692e696d6775722e636f6d2f74386d316f79362e706e67)

This one is failry simmilar to adding a custom side bar link so edit main.xxxxxxxxxx.bundle.js

find this string:

    <div style="height:.5em;"></div>',

replace it with the following (replace the img src for a different url or image if you wish by default it will grab the logowhite.png from the web root which will need to be added by the user, any full form url will also work instead of "/web/logowhite.png"):

    <div style="height:.5em;"></div>',n+='<img src="/web/logowhite.png" width=250px style="padding: 5px;display:block; margin-left: auto; margin-right: auto;">',



---

## custom css (jellyflix with a set of my own modifications/ tweaks added)

simply copy the contents of customcss.css (in this repo http://git.bbod.tk/BobHasNoSoul/jellyfin-mods/blob/main/customcss.css ) to your general custom css tab and paste.. or host it yourself or link to it the following is an example if you download customcss.css to your web root (/usr/share/jellyfin/web/)

    @import url("customcss.css");  
    /*fix text being half over to the left on details page*/
    .detail-clamp-text {width: 98vw !important; left: 1% !important; right 1% !important;}
    .detailPagePrimaryContent {padding-bottom: 1rem !important;}
    .backgroundContainer { background-color: #181818 !important;}
    /*fix spacing on the my media*/
    .card {    margin-left: auto !important;    margin-right: auto !important; padding-top: 22px !important;}

this theme does use the font pack for ubuntu you can find this here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular and you can just unzip that font pack into /usr/share/jellyfin/web/fonts so .woff files etc are in that dir (not a nested folder)



---

## Adding your logo at the top of the login page

![Capture](https://user-images.githubusercontent.com/23018412/115956212-6b59fd80-a4f3-11eb-915c-324688cf10cb.PNG)
![Capture2](https://user-images.githubusercontent.com/23018412/115956214-6dbc5780-a4f3-11eb-902c-c1068de13163.PNG)

simply go to your web root for jellyfin /usr/share/jellyfin/web/ and use nano (or your own text editor) to edit the session-login-index-html.xxxxxxxxxxxxxxxxxxxxx.bundle.js file
for nano just use 

    sudo nano session-login-index-html.*.bundle.js

press ctrl+w and find the string

     <div class="padded-left padded-right padded-bottom-page margin-auto-y">

now directly after this string paste the following (but ammend for your own logo it can even be a gif if you want animated etc)

    <img src="/web/logo.png" width=350px style="padding: 0px;display:block; margin-left: auto; margin-right: auto;">



---

## add a link to get more avatars on the profile page 
(this is great to host your own avatars but needs the user to manually download them :/ here is a full guide for a selfhosted pack https://github.com/BobHasNoSoul/jellyfin-avatars but the one bellow is for litterally any other host you want to use)

![Capture](https://user-images.githubusercontent.com/23018412/115957171-d65a0300-a4f8-11eb-8a8a-698e4620ea6d.PNG)

i have mine opening a new tab on a host with loads of avatars from many different services, psn, xbl, netflix and a few others

![Capture](https://user-images.githubusercontent.com/23018412/115976186-3eddca00-a563-11eb-8597-81341924c750.PNG)

open the file user-profile-index-html.xxxxxxxxxxxxxxxxxxxxx.bundle.js (xs are placeholders) from your jellyfin web root (/usr/share/jellyfin/web) then

replace the following string

    <span>${DeleteImage}</span> </button>

with the following string obviously replace the capitalised link that clearly is just a placeholder all of mine are selfhosted so a link to me would be worthless

    <span>${DeleteImage}</span> </button> <button is="emby-buttoon" type="button" class="raised" id="btnMoreImages">><STYLE>A {text-decoration: none; color: #def3fb} </STYLE><span>${<a href="https://YOURLINKTOAVATARS.COM" target="_blank">More Images</a>}</span></button>

save and reload the profile page



---

## Trailers tab to Requests tab

![Capture](https://user-images.githubusercontent.com/23018412/115976129-c5de7280-a562-11eb-9a07-62338388aa9c.PNG)

this replaces the broken trailers tab with a working requests tab, giving clients the ability to login to your ombi from the movie requests tab :D

okay so first you need to modify two files located inside your jellyfin webroot (/usr/share/jellyfin/web/) obviously change the xs to your unique identication

the first file

    sudo nano movies-moviesrecommended.xxxxxxxxxxx.bundle.js

find the string

    {name:h.ZP.translate("Trailers")}

replace it with

    {name:h.ZP.translate("Requests")}
	
the second file (a little bit more complex)

    sudo nano movies-movies-html.xxxxxxxxxxxx.bundle.js

find the string

    <div class="pageTabContent" id="trailersTab" data-index="2"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSort autoSize" title="${Sort}"><span class="material-icons sort_by_alpha"></span></button> <button is="paper-icon-button-light" class="btnFilter autoSize" title="${Filter}"><span class="material-icons filter_list"></span></button> </div> <div class="alphaPicker alphaPicker-fixed alphaPicker-fixed-right alphaPicker-vertical"> </div> <div is="emby-itemscontainer" class="itemsContainer vertical-wrap padded-left padded-right"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> <div class="pageTabContent" id="favoritesTab" data-index="3"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSelectView autoSize" title="${ButtonSelectView}"><span class="material-icons view_comfy"></span></button> </div> <div is="emby-itemscontainer" class="itemsContainer padded-left padded-right"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> <div class="pageTabContent" id="collectionsTab" data-index="4"> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> <button is="paper-icon-button-light" class="btnSelectView autoSize" title="${ButtonSelectView}"><span class="material-icons view_comfy"></span></button> <button is="paper-icon-button-light" class="btnSort autoSize" title="${Sort}"><span class="material-icons sort_by_alpha"></span></button> <button type="button" is="paper-icon-button-light" class="btnNewCollection autoSize"><span class="material-icons add"></span></button> </div> <div is="emby-itemscontainer" class="itemsContainer vertical-wrap centered padded-left padded-right" style="text-align:center"> </div> <div class="flex align-items-center justify-content-center flex-wrap-wrap padded-top padded-left padded-right padded-bottom"> <div class="paging"></div> </div> </div> 
	
replace it with this (replace the obvious part inside the string too)	

    <div class="pageTabContent" id="trailersTab" data-index="2"> <div> <iframe src="https://REPLACEME.COM" width="100%" height="850px"></iframe> </div> </div> 



---

## Add custom link to side bar

![](https://camo.githubusercontent.com/ffd52556715cd72021af339118fe1bb3466b7686c3d75bd473c694d0ff1228a3/68747470733a2f2f692e696d6775722e636f6d2f74386d316f79362e706e67)

open your jellyfin web root (/usr/share/jellyfin/web) and modify main.XXXXXXXXXXXXXXXX.bundle.js replace the Xs.. with your own unique id

find the string:

    +m.ZP.translate("Home")+"</span></a>",

replace it with:

    +m.ZP.translate("Home")+"</span></a>", n+='<a is="emby-linkbutton" class="navMenuOption lnkMediaFolder" href="http://YOUROMBIHERE.COM"><i class="md-icon navMenuOptionIcon"><img src="https://i.ibb.co/zhc7zKV/ombi10.png"></i><span class="navMenuOptionText">'+m.ZP.translate("Requests")+"</span></a>",

want more links just keep adding these to the end of the string:

     n+='<a is="emby-linkbutton" class="navMenuOption lnkMediaFolder" href="http://YOURLINK.COM"><i class="md-icon navMenuOptionIcon"><img src="https://ICONIMAGE.COM"></i><span class="navMenuOptionText">'+m.ZP.translate("LINKNAME")+"</span></a>",
     
     
---

## Seasonal Animations

*note the snow animation has been upgraded for a more blizzard effect*

![screen](https://i.imgur.com/xDWkJkc.gif)

simply run the following

    cd /usr/share/jellyfin/web
    sudo git clone http://git.bbod.tk/BobHasNoSoul/jellyfin-mods.git
    cd jellyfin-mods
    sudo mv seasonal ../ 
    cd ..
    sudo rm -r jellyfin-mods


to manually change to each animation you can run the scripts located:
    /usr/share/jellyfin/seasonal/add*.sh
and to remove run the remove script


insert these into your crontab for automated changing

    ## adding seasonal themes
    ## add snow (uncomment one of the snow effects bellow and comment the others out, by default the most snow is enabled)
    #0 0 1 12 * /usr/share/jellyfin/web/seasonal/addsnow.sh
    #0 0 1 12 * /usr/share/jellyfin/web/seasonal/addsnowflakes.sh
    0 0 1 12 * /usr/share/jellyfin/web/seasonal/addmoresnow.sh
    ## remove snow
    0 0 26 12 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add hearts
    0 0 14 2 * /usr/share/jellyfin/web/seasonal/addhearts.sh
    ## remove hearts
    0 0 15 2 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add pattysday
    0 0 17 3 * /usr/share/jellyfin/web/seasonal/addpattysday.sh
    ## remove pattysday
    0 0 18 3 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## add halloween
    0 0 1 10 * /usr/share/jellyfin/web/seasonal/addshalloween.sh
    ## remove halloween
    0 0 1 11 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh
    ## Adding fireworks (DISABLED BY DEFAULT THIS BREAKS XBOX MICROSOFT EDGE)
    #0 0 31 12 * /usr/share/jellyfin/web/seasonal/addfireworks.sh
    ## Remove fireworks (Disabled by default)
    # 0 0 1 1 * /usr/share/jellyfin/web/seasonal/removeseasonal.sh

---

## Hide Scrollbar in older microsoft edge (xbox clients) 

    sudo sed -i -e '$abody { -ms-overflow-style: none !important; }' /usr/share/jellyfin/web/themes/dark/theme.css

this adds a line to make it hide the scroll bar while retaining function of the scroll.. yay no more invasive scroll bar from the early 00s

--- 

## Pan and tilt the backdrops with fades in and out

this is custom css and you can use and adjust all or any values you like but personally i like these values
```
/*pan the background for backdrops*/
@keyframes backgroundScroll {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%; opacity:1;}
40% { background-position: 99% 99%; opacity:0;}
66% { background-position: 50% 50%; }
75% { background-position: 1% 1%; }
100% { background-position: 50% 50%; }}
.backdropImage {background-size: 150% 150%;  opacity:0 ;background-position: 99% 1%; animation: backgroundScroll 60s ease-in-out 1s infinite;}

@keyframes backgroundScrollmob {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%; opacity:1;}
40% { background-position: 1% 99%; opacity:0}
66% { background-position: 99% 50%; }
75% { background-position: 99%% 99%; }
100% { background-position: 50% 50%; }}
@media (max-width: 600px) {
  .backdropImage {background-size: 120% 120% cover; opacity:0 ; background-position: 99% 1%; animation: backgroundScrollmob 60s ease-in-out 1s infinite;}
}
```
simply paste that into your custom css in general settings and hit save (works really well with forced backdrop mod)
