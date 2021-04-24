# jellyfin-mods
This is just a guide for various modifications and dumping ground for jellyfin mods i have been kicking around so i dont have to make a new jftool for every platform and revision when they change one single thing that can break it for those that cant or dont want to recompile (yes recompiling would be the way forward but it is not for everyone)

#### Please note this is if you do not want or are unable to compile the web client yourself.. there are better ways of doing these mods but if you insist here is the way to run at it. (not preaching its your server after all :D )

## Force backdrops for all users (10.7.x)

Modify this string in your main.Xxxxxxxxxx.bundle.js to default it to tick (forcing most users default.. unless disabled by them)

    enableBackdrops:function() {return _}

Change it to

    enableBackdrops:function() {return x}

Save and clear cache reload on clients

## Change splash logo 
besides changing the logo image in the web root files location (/usr/share/jellyfin/web/assets/img/ banner-light.png and icon-transparent.png) which is easy but stops them being animated you can modify index.html to add in your own image or custom gif personally i use a gif that is animated to pulse with my server "BlueBoxOfDOOM" logo

to do this find this string but add what ever you like in where the icon-transparent.png is i.e. if you have a gif in your web root just replace "assets/img/icon-transparent.png" with mygif.gif (this assumes that your gif is named mygif.gif) 

    background-image: url(assets/img/icon-transparent.png);

and then replace the other instance in the splashlogo that is originally this string:

    background-image: url(assets/img/banner-light.png)
    
you can even direct it outside of your host to any other host by changing the part inside the brackets to a full form url e.g. https://media.tenor.com/images/f0e22aca6a9498ce63497ca56fb49602/tenor.gif for that cool 80s rick roll feeling or you can go more proffesional looking... i dont care, its not my server.. your the one modding and using it.

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

## Login Background that changes each reload

after a reload the image changes, these are stills to give you the basic idea (yes all images can also be changed for whatever you like or even add more or less depending on use case).
![1](https://user-images.githubusercontent.com/23018412/114848291-75cf1580-9dd6-11eb-982c-02c1829785aa.PNG)
after another reload
![2](https://user-images.githubusercontent.com/23018412/114848300-78ca0600-9dd6-11eb-8120-174a7d22f3ab.PNG)
after another reload
![3](https://user-images.githubusercontent.com/23018412/114848306-79fb3300-9dd6-11eb-8880-ecdba1b47650.PNG)

this one was just a quick javascript and some files for backgrounds that will let a user be more impressed by certain content you can decide to showcase for that please visit the repo i made https://github.com/BobHasNoSoul/jellyfin-fanartbackground it explains it in full and has some screen shots and all required files to download.

## Adding logo to sidebar

![logosidebar](https://camo.githubusercontent.com/ffd52556715cd72021af339118fe1bb3466b7686c3d75bd473c694d0ff1228a3/68747470733a2f2f692e696d6775722e636f6d2f74386d316f79362e706e67)

This one is failry simmilar to adding a custom side bar link so edit main.xxxxxxxxxx.bundle.js

find this string:

    <div style="height:.5em;"></div>',

replace it with the following (replace the img src for a different url or image if you wish by default it will grab the logowhite.png from the web root which will need to be added by the user, any full form url will also work instead of "/web/logowhite.png"):

    <div style="height:.5em;"></div>',n+='<img src="/web/logowhite.png" width=250px style="padding: 5px;display:block; margin-left: auto; margin-right: auto;">',

## custom css (jellyflix with a set of my own modifications/ tweaks added)

simply copy the contents of customcss.css (in this repo https://github.com/BobHasNoSoul/jellyfin-mods/blob/main/customcss.css ) to your general custom css tab and paste.. or host it yourself or link to it the following is an example if you download customcss.css to your web root (/usr/share/jellyfin/web/)

    @import url("customcss.css");  

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

## to be added that work on 10.7.x
- animated seasonal themes (look at https://camo.githubusercontent.com/3201f60e995291c6f68d8e3d19d094a359d4f6658aef1e74f62f97010cb62079/68747470733a2f2f692e696d6775722e636f6d2f7844576b4a6b632e676966 for the basic idea) and i will add this when i can get time for a clear write up of each section this will take a little while. 
- replace the trailers tab with requests https://camo.githubusercontent.com/b21d09d7c6ca84c6c19a480aea9c55236531a2aa42416efa65c43a1ca3caab4d/68747470733a2f2f692e6962622e636f2f744d39476a6e772f747261696c6572746f72657175657374732e706e67

## idea that may be retired or revived if i can get it to work
- https://i.imgur.com/Qq2eWIz.mp4 extra fanart (useful for displaying box covers disc covers and other good stuff like if you have p90x calendars etc so when a user clicks it they have that image open full size in a new tab) but seeing as the code has changed a lot since i had this and had the time to work on this chances are this will be retired. i am leaving this here as a possibility and reminder for myself.
