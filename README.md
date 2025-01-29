# jellyfin-mods

### These mods are working and tested on **Jellyfin 10.9.x** (mods for older versions can be found [here](https://github.com/BobHasNoSoul/jellyfin-mods/blob/main/10.8.x.md)). More will be added when I get the chance, or if you want please feel free to submit a pull request with your own mods to add to the collection. 

If you are having issues with finding the web root, you may need to see the [help.md](https://github.com/BobHasNoSoul/jellyfin-mods/blob/main/help.md) to find help with your particular deployment.

> Please note this method of Jellyfin modding is intended for those who do not want or are unable to compile the web client yourself... There are better ways of doing these mods, but if you insist, this is the way to do it. (Not preaching, it's your server after all :D)

## Table of Contents
- [jellyfin-mods](#jellyfin-mods)
  - [CSS mods](#css-mods)
    - [Hide the "Please sign in" dialog](#hide-the-please-sign-in-dialog-and-prevent-the-login-area-moving-up-too-far-by-adding-a-margin)
    - [Change the background image of the login page](#change-the-background-image-of-the-login-page)
    - [Hide the top bar on the login page](#hide-the-top-bar-on-the-login-page)
    - [Transparent top bar](#transparent-top-bar)
    - [Lighten the backdrop background](#lighten-the-backdrop-background)
    - [Partially transparent side menu](#partially-transparent-side-menu)
    - [Hide the "Trailers" tab from movie libraries](#hide-the-trailers-tab-from-movie-libraries)
    - [Use the media item's logo and hide title when present](#use-the-media-items-logo-and-hide-title-when-present)
    - [Remove the "My Media" section title](#remove-the-my-media-section-title)
  - [Custom Netflix-like login page](#custom-netflix-like-login-page)
  - [Avatar library for your users](#avatar-library-for-your-users)
  - [Change the title of the page](#change-the-title-of-the-page)
  - [Change the default iOS/Android "app" title and description](#change-the-default-iosandroid-app-title-and-description)
  - [Featured Content Bar](#featured-content-bar)
  - [Force backdrops for all users](#force-backdrops-for-all-users)
  - [Force theme music for all users](#force-theme-music-for-all-users)
  - [Force disable "Show next video info during playback"](#force-disable-show-next-video-info-during-playback)
  - [Change font to whatever you want](#change-font-to-whatever-you-want)
  - [Set limit on how long items should be in the next up section](#set-limit-on-how-long-items-should-be-in-the-next-up-section)
  - [Add a custom logo at the top of the login page](#add-a-custom-logo-at-the-top-of-the-login-page)
  - [Add a custom link button under the login page](#add-a-custom-link-button-under-the-login-page)
  - [Add a custom logo to side bar](#add-a-custom-logo-to-side-bar)
  - [Add a custom link to side bar](#add-a-custom-link-to-side-bar)
  - [Add requests tab](#add-requests-tab)
  - [Hide scrollbar on older Microsoft edge (Xbox clients)](#hide-scrollbar-on-older-microsoft-edge-xbox-clients)
  - [Pan and tilt the backdrops with fades in and out](#pan-and-tilt-the-backdrops-with-fades-in-and-out)
  - [Default user page size](#default-user-page-size)
  - [Change the favicon](#change-the-favicon)
  - [Seasonal themes](#omg-seasonal-themes-are-back)
- [Bugfixes / Workarounds](#bugfixes--workarounds)
- [Some extra tools to be used with Jellyfin](#some-extra-tools-to-be-used-with-jellyfin)

---

## CSS mods

##### These mods are very easy to apply. Simply copy and paste the relevant code into the "Custom CSS code" textbox in the General tab of your Jellyfin admin dashboard. 

### Hide the "Please sign in" dialog and prevent the login area moving up too far by adding a margin:

```css
/*Hide "Please sign in" text, margin is to prevent login form moving too far up*/
#loginPage h1 {display: none}
#loginPage .padded-left.padded-right.padded-bottom-page {margin-top: 10px}
```

### Change the background image of the login page:

```css
/*Change login page background*/
#loginPage {
    background: url(https://i.imgur.com/Ewk3Pqw.png) !important;
    background-size: cover !important;
}
```

### Hide the top bar on the login page:

```css
/*Hide the top bar when the login page is visible*/
body:has(#loginPage:not(.hide)) .skinHeader {
    display: none !important;
}

/*Show the top bar when the login page is hidden or absent*/
body:not(:has(#loginPage:not(.hide))) .skinHeader {
    display: flex !important;
}
```

### Transparent top bar:

```css
/*Transparent top bar*/
.skinHeader-withBackground {background-color: #20202000 !important;}
```

### Lighten the backdrop background:

```css
/*Lighten background*/
.backgroundContainer.withBackdrop {background-color: rgba(0, 0, 0, 0.34) !important;}
```

### Partially transparent side menu:

```css
/*Partially transparent side bar*/
div.mainDrawer {background-color: rgba(0,0,0,0.6) !important;}
```

### Hide the "Trailers" tab from movie libraries: 

Thanks to #64

```css
/*Hide the "Trailers" tab in Movies*/
.mainDrawer:has(.navMenuOption-selected[href^="#/movies.html"]) + .skinHeader .emby-tab-button[data-index="2"] {
display: none !important;
}
```

### Use the media item's logo and hide title when present:

This mod takes the title text away when an item has a valid logo loaded, thus avoiding the problem of showing you the logo of *Game of Thrones* for example, and then also saying *Game of Thrones* in plain text underneath...

```css
/*If the logo is present on the details page of an item, hide the items' title*/
#itemDetailPage .itemName.infoText.parentNameLast > bdi:nth-child(1) {display: none;}
.hide+.detailPageWrapperContainer .itemName > bdi:nth-child(1) {display: block !important;}
/*Do the same for the single episodes link back title*/
#itemDetailPage .parentName > bdi:nth-child(1) {display: none;}
.hide+.parentName > bdi:nth-child(1) {display: block !important;}
```

### Remove the "My Media" section title:

```css
/*Remove "My Media" title*/
.section0 .sectionTitle {display: none;}
```

---

## Custom Netflix-like login page

*Note: Ignore the custom logo; that's covered in a mod further down.*

<img width="960" alt="Screenshot 2024-05-18 193326" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/7d69fb07-1b08-4c0b-9050-e0334dcdb55a">

In your admin dashboard, under General, check 'Enable the splash screen' and click save. Then add the following to the custom CSS, click save again, then reload your login page.

```css
/*Custom login page of awesome*/
#loginPage {

  background-image: url('/Branding/Splashscreen?format=jpg&foregroundLayer=20.0');
  background-position: top left;
  background-size: 200%;
  background-attachment: fixed;
  animation: backgroundAnimation 150s infinite alternate;
  z-index: 2;
}

@keyframes backgroundAnimation {
  0% {
    background-position: top left;
  }
  25% {
    background-position: bottom right;
  }
  50% {
    background-position: bottom left;
  }
  100% {
    background-position: top left;
  }
}

.skinHeader.semiTransparent.noHeaderRight {
  background: transparent !important;
}

div#loginPage {
  margin-top: 0 !important;
  overflow: hidden scroll;
}

#loginPage h1::after {
  content: "Sign In";
  font-size: 32px;
}

#loginPage h1 {
  font-weight: 700;
  font-size: 0;
  margin-bottom: 21.44px;
  margin-top: 32px !important;
  text-align: left;
}

.inputContainer {
  margin-bottom: 1.8em;
  margin-top: 1.8em;
}

#loginPage .padded-left.padded-right.padded-bottom-page {
    background: #000000bf;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 21px;
    position: absolute;
    border-radius: 10px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding: 3em !important;
}

#loginPage .readOnlyContent {
  padding: 0 !important;
  width: 100% !important;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}

.manualLoginForm {
  height: 100%;
  width: 100%;
}

#loginPage .inputContainer {
  background: #333;
  border-radius: var(--rounding);
  height: 4em;
  position: relative;
}

#loginPage .inputLabel.inputLabelFocused,
#loginPage .inputLabel:not(.inputLabel-float) {
  font-size: 0.8em;
  left: 4%;
  top: 4%;
  transform: none;
}

.visualLoginForm {
  width: 100%;
  position: relative;
  overflow: hidden;
}

#divUsers {
  flex-flow: revert;
  overflow: scroll visible;
  justify-content: flex-start;
}

#loginPage .emby-input {
  height: 100%;
  border: none;
  background: transparent !important;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: none !important;
  padding: 4% !important;
  font-size: 1.1em;
  border: none !important;
}

#loginPage .inputLabel {
  position: absolute;
  top: 50%;
  left: 4%;
  transform: translateY(-50%);
  font-size: 1.5em;
  font-weight: 300;
  transition: 0.2s ease;
  color: #8c8c8c;
}

#loginPage .inputContainer:focus,
#loginPage .inputContainer:focus-within {
  background: #454545;
}
```

---

## Avatar library for your users

![306088109-e641792f-f408-4834-a5b1-c77d5e9a17d4](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/e6d54434-6262-4aaa-83d9-80af6b3b415f)

![306088112-339d0f5b-ca10-4a47-9fce-baf6345cf465](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/fa81553a-9bd5-4655-aaaf-81bbcb25b302)

For full instructions, please visit the dedicated repo at: https://github.com/BobHasNoSoul/jellyfin-avatars

Effectively, this adds a button next to the user profile image that links straight to an avatar library that works with a simple click to download images, enabling your users to upload them and use them on the server.

## Change the title of the page
To be clear, this mod changes the title that appears in browser tabs from "Jellyfin" to your own unique name like "My Awesome Server" or in the example code `<YOUR TITLE HERE>`. You can use either method.

#### Method 1
Go to your web root and run: 

```sh
sudo nano index.html
``` 

Then, inside the <body> tags, add the following: 

```css
<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Check if the title is "Jellyfin" before changing it
        if (document.title === "Jellyfin") {
            document.title = "<YOUR TITLE HERE>";
        }

        // Create a MutationObserver to prevent any changes to the title
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Only change the title if it's set to "Jellyfin"
                    if (document.title === "Jellyfin") {
                        document.title = "<YOUR TITLE HERE>";
                    }
                }
            });
        });

        // Observe the document title for changes
        observer.observe(document.querySelector('title'), { childList: true });

        // Set up a fallback in case of attempts to change the title through direct assignment
        Object.defineProperty(document, 'title', {
            set: function(value) {
                // Only allow the title to change if the new value is "Jellyfin"
                if (value === "Jellyfin") {
                    document.querySelector('title').textContent = "<YOUR TITLE HERE>";
                } else {
                    document.querySelector('title').textContent = value;
                }
            },
            get: function() {
                return document.querySelector('title').textContent;
            }
        });
    });
</script>

```
To prevent the `Jellyfin` title from appearing briefly when loading, also change the title tag `<title>Jellyfin</title>`to `<title>YOUR TITLE HERE</title>`

Obviously change the `<YOUR TITLE HERE>` parts to your personal custom title you want the server to have.

Save the file and reload the cache on your clients to see your changes.

#### Method 2 (The old way)

Go to your web root and create a new file called `title.sh` and inside that file add the following:

```sh
grep -rl 'document\.title="Jellyfin"' . | while read -r file; do
    sed -i 's/document\.title="Jellyfin"/document\.title="<YOUR TITLE HERE>"/g' "$file"
done
grep -rl 'document.title=e||"Jellyfin"' . | while IFS= read -r file; do
    sed -i 's/document.title=e||"Jellyfin"/document.title=e||"<YOUR TITLE HERE>"/g' "$file"
done
```
Obviously change the `<YOUR TITLE HERE>` parts to your personal custom title you want the server to have.

Save the file, then run:
```sh
sudo chmod +x title.sh sudo ./title.sh
```

Reload the cache on your clients to see your changes.

#### Method 3 (Nginx Proxy)
Open the file containing your jellyfin proxy settings

Add the following lines at the end of your location block.
```
proxy_set_header Accept-Encoding "";
sub_filter_once off;
sub_filter '<title>Jellyfin</title>' '<title>YOUR_NEW_TITLE</title>';
sub_filter '<meta name="application-name" content="Jellyfin">' '<meta name="application-name" content="YOUR_NEW_TITLE">';
sub_filter '</head>' '<script>document.title="YOUR_NEW_TITLE",new MutationObserver(function(t){"Jellyfin"==document.title&&(document.title="YOUR_NEW_TITLE")}).observe(document.querySelector("title"),{subtree:!0,characterData:!0,childList:!0});</script></head>';
```
Make sure to replace `YOUR_NEW_TITLE` parts to your personal custom title you want the server to have.

Restart your nginx proxy to apply changes, and reload the cache of your clients.

---

## Change the default iOS/Android "app" title and description
This mod changes the title and description that appear when adding the site to your homescreen as a webapp from "Jellyfin" to your own unique name like "My Awesome Server" or in the example code `<YOUR TITLE HERE>`.

Go to your web root and run:

```sh
grep -oP '<link[^>]*rel="manifest"[^>]*href="[^"]*"' index.html | grep -oP '(?<=href=")[^"]*'
```

This command will output a JSON filename, copy it, then run `sudo nano <YOUR_COPIED_FILENAME>` to edit the file.

```json
{
    "name": "<YOUR TITLE HERE>",
    "description": "<YOUR DESCRIPTION HERE>",
    "lang": "en-US",
    "short_name": "<YOUR TITLE HERE>",
    "start_url": "index.html#/home.html",
    "theme_color": "#101010",
    "background_color": "#101010",
    "display": "standalone",
    "icons": [
        {
            "sizes": "72x72",
            "src": "touchicon72.png",
            "type": "image/png"
        },
        {
            "sizes": "114x114",
            "src": "touchicon114.png",
            "type": "image/png"
        },
        {
            "sizes": "144x144",
            "src": "touchicon144.png",
            "type": "image/png"
        },
        {
            "sizes": "512x512",
            "src": "touchicon512.png",
            "type": "image/png"
        }
    ]
}
```
Obviously change the `<YOUR TITLE HERE>` and `<YOUR DESCRIPTION HERE>` parts to your personal custom title/description you want the homescreen shortcut to have, but leave everything else as is.

Save the file and reload the cache on your clients to see your changes.

---

## Featured Content Bar

<img width="212" alt="Screenshot 2024-05-18 200753" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/d3351fc8-ed95-477c-8bbe-655a0d61d078">

<img width="950" alt="Screenshot 2024-05-18 200934" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/0e0f5b14-30a4-4325-b732-29f6be9308e9">

This allows the user to add custom featured content to be pinned to the homepage. Please see [the separate repo for this](https://github.com/BobHasNoSoul/jellyfin-featured/) for more details.

Allows for the use of a specific account's favorites to promote content, as well as user-defined custom lists that are looped through via crontab.

---

## Force backdrops for all users

In `main.jellyfin.bundle.js` simply search for:

```js
enableBackdrops:function(){return _}
```

And replace it with: 

```js
enableBackdrops:function(){return E}
```

Save the file and reload the cache on your clients to see your changes.


*** If you cannot find it (because of regex in search like in nano) try searching for `enableBackdrops:function`. This should give you the ability to find the string above ***

---

## Force theme music for all users

In `main.jellyfin.bundle.js` simply search for:

```js
enableThemeSongs:function(){return j}
```

And replace it with:

```js
enableThemeSongs:function(){return P}
```

Save the file and reload the cache on your clients to see your changes.


*** If you cannot find it (because of regex in search like in nano) try searching for `enableThemeSongs:function`. This should give you the ability to find the string above ***

Pro tip: Use the theme songs plugin to grab multiple theme songs for TV shows in one go (https://github.com/danieladov/jellyfin-plugin-themesongs), or manually add a theme .mp3 at the root of each TV show folder (i.e. `/tv/breaking bad/theme.mp3`). This mod also works for movies of course, but you will have to manually grab each theme song as the mentioned plugin does not work with movies.

---

## Force disable "Show next video info during playback"

*This mod prevents conflict between the [Intro Skipper](https://github.com/intro-skipper/intro-skipper) plugin's "Next" dialog and Jellyfin's native dialog by disabling the ladder for all users. Unfortunately, Jellyfin's native dialog is much better, but there is currently no way to disable the dialog from Intro Skipper, and this is certainly better than having both of them overlap.*

In `main.jellyfin.bundle.js` simply search for:

```js
enableNextVideoInfoOverlay:function(){return j}
```

And replace it with:

```js
enableNextVideoInfoOverlay:function(){return ne}
```

Save the file and reload the cache on your clients to see your changes.


*** If you cannot find it (because of regex in search like in nano) try searching for `enableNextVideoInfoOverlay:function`. This should give you the ability to find the string above ***

---

## Change font to whatever you want
First, get a font pack... there are many out there... so take your time looking for one you really like the look of and download it. You can get some free fonts from https://google-webfonts-helper.herokuapp.com/fonts/, but there are many other free sources. Once you've found a font, navigate to your Jellyfin web root and create a new folder called "fonts" (your font pack should contain .woff .woff2 .tff .eot and .svg files), and unzip the contents of your font archive into this folder. For this example, I used the Ubuntu font (don't judge me). You can get the same font from here https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular

Extract the contents of your font archive into following directory:

    /usr/share/jellyfin/web/fonts/

Then, simply add the following to your custom CSS (rename them for your files in turn unless you're using the linked Ubuntu font):

```css
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
```

(Alternative download method) Easy mode for Ubuntu font... (You can use this as a guide to do this for other fonts too if you prefer downloading through the terminal)

```sh
cd /usr/share/jellyfin/web/
sudo mkdir fonts
sudo wget -O fonts/ubuntu.zip "https://google-webfonts-helper.herokuapp.com/api/fonts/ubuntu-mono?download=zip&subsets=latin&variants=regular"
sudo unzip fonts/ubuntu.zip -d fonts/
```

Now your font is where it should be, just modify the CSS in the General tab of your Jellyfin admin dashboard to suit different names of fonts.

---

## Set limit on how long items should be in the next up section

The default time for this is one year (365 days).

To change this, simply go to your web root and run:

```sh
sudo nano main.jellyfin.bundle.js
```

Then, find:
```js
t("maxDaysForNextUp",e.toString(),!1);var t=parseInt(this.get("maxDaysForNextUp",!1),10);return 0===t?0:t||365}}
```

Replacing the 365 with whatever value you want in days.

Save the file and reload the cache on your clients to see your changes.

---

## Add a custom logo at the top of the login page

<img width="960" alt="Screenshot 2024-05-18 193326" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/e69aea0d-d1a3-4fb0-9e9b-31a008daa8b0">


Simply go to your web root and edit the session-login-index-html.xxxxxxxxxxxxxxxxxxxxx.chunk.js file:

```sh
sudo nano session-login-index-html.*.bundle.js
```

Press <kbd>Ctrl</kbd> + <kbd>W</kbd> and find the following string:

```js
<div class="padded-left padded-right padded-bottom-page margin-auto-y">
```

Now, directly after this string paste the following (but obviously amend for your own logo, it can even be a GIF if you want):

```js
<img src="/web/logo.png" width=350px style="padding: 0px;display:block; margin-left: auto; margin-right: auto;">
```

---

## Add a custom link button under the login page

![Screenshot 2024-08-17 124955](https://github.com/user-attachments/assets/726ea558-464b-4eef-bef5-7e8d0a43cf5d)

In your web root run:

```
sudo nano session-login-index-html.*.chunk.js
```

Then, use find and replace ( <kbd>Ctrl</kbd> + <kbd> \ </kbd> ) to find:

```js
<div class="loginDisclaimer
```

And replace it with:
```js
<a href="https://www.example.com" class="emby-button raised block btnCUSTOMBUTTON">NEW LINK BUTTON TEST</a> <div class="loginDisclaimer
```

Save the file and reload the cache on your clients to see your changes.

---

## Add a custom logo to side bar

<img width="934" alt="Screenshot 2024-05-18 194802" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/ad1be764-d76b-43e9-9f38-41f683a74e76">

In your web root run:

```sh
grep -r -l -n 'customMenuOptions' .
```

This command will output a filename, copy it, then run `sudo nano <YOUR_COPIED_FILENAME>` to edit the file.

Then, use find and replace ( <kbd>Ctrl</kbd> + <kbd> \ </kbd> ) to find:

```css
<div style="height:.5em;"></div>',n+='
```

And replace it with the following (obviously replace YOURLOGOURLHERE with your actual URL):

```js
<div style="height:.5em;"></div>',n+='<img src="YOURLOGOURLHERE" width=250px style="padding: 5px;display:block; margin-left: auto; margin-right: auto;">
```

Save the file and reload the cache on your clients to see your changes.

---

## Add a custom link to side bar

Find the `config.json` file in your web root. Change the "menuLinks" section to the following and adjust the properties to suit your needs (icons are from [Material Design Icons](https://jossef.github.io/material-design-icons-iconfont/)).

```json
"menuLinks": [
{
    "name": "Custom Link",
    "url": "https://jellyfin.org"
},
{
    "name": "Custom Link w. Custom Icon",
    "icon": "attach_money",
    "url": "https://demo.jellyfin.org/stable"
}
],
```

If you only want one link, make sure to remove the comma after the closing bracket (}). If you want to add more links, add a comma for every entry except the last one.

---

## Add requests tab

![image](https://github.com/user-attachments/assets/b0860546-edc0-4d42-acba-3caa095ee666)


- Before doing anything, remember to backup the files we are going to edit
- Go to your web root and edit the `index.html` file
- Find `</body></html>` and paste the following right before it:
```html
    <script>
      const createRequestTab = () => {
        console.log("Creating request tab");
        const title = document.createElement("div");
        title.classList.add("emby-button-foreground");
        title.innerText = "Requests";
  
        const button = document.createElement("button");
        button.type = "button";
        button.is = "empty-button";
        button.classList.add("emby-tab-button", "emby-button", "lastFocused");
        button.setAttribute("data-index", "2");
        button.setAttribute("id", "requestTab");
        button.appendChild(title);
  
        (function e() {
          const tabb = document.querySelector(".emby-tabs-slider");
          if (tabb && !document.querySelector("#requestTab")) {
            tabb.appendChild(button);
          } else if (!tabb) {
            setTimeout(e, 500);
          }
        })();
      };
  
      // Initial page load
      document.addEventListener("DOMContentLoaded", () => {
        createRequestTab();
      });
  
      // When navigating back or forward
      window.addEventListener("popstate", () => {
        createRequestTab();
      });
    </script>
```
- Save the file with your changes. This is the script that creates the tab.
- Now edit the `home-html.*.chunk.js` file
- Find:

```js
data-backdroptype="movie,series,book">
```

Then paste the following right after it:

```js
<style>:root{--save-gut:max(env(safe-area-inset-left),3.3%)}.requestIframe{margin:0 .4em;padding:0 var(--save-gut);width:calc(100% - (.4em * 2) - (var(--save-gut) * 2));height:85vh;border:none;position:absolute;top:0}</style><script>setTimeout(() => {createRequestTab()}, 500)</script>
```

- This is what will make it look good and start the script that creates the tab.
- And now, find:

```js
id="favoritesTab" data-index="1"> <div class="sections"></div> </div>
```

Then paste the following right after it:

```js
<div class="tabContent pageTabContent" id="requestsTab" data-index="2"> <div class="sections"><iframe class="requestIframe" src="[YOUR_REQUEST_SERVICE_HERE]"></iframe></div> </div>
```
- This is what will make the service open in the correct tab.

For example, I'm using Jellyseerr as my request service, so, my last part would be ```<iframe class="requestIframe" src="[MY_LOCAL_IP]:5055"></iframe>```

---

## Hide scrollbar on older Microsoft edge (Xbox clients) 

```sh
sudo sed -i -e '$abody { -ms-overflow-style: none !important; }' /usr/share/jellyfin/web/themes/dark/theme.css
```

This adds a line to make it hide the scrollbar while retaining scroll functionality... so yay no more invasive scrollbar from the early 00s!

--- 

## Pan and tilt the backdrops with fades in and out

Video of this in action:
https://gfycat.com/sizzlingcavernousgalapagospenguin

This mod works really well with the forced backdrop mod!

It's simply custom CSS, and you can use and adjust any and all values you like. Personally, I like these values:

```css
/*Pan the background for backdrops*/
@keyframes backgroundScroll {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%;opacity:1;}
40% { background-position: 99% 99%; opacity:0;}
66% { background-position: 50% 50%; }
75% { background-position: 1% 1%; }
100% { background-position: 50% 50%; }}
.backdropImage {background-size: 150% 150%;  opacity:0 ;background-position: 99% 1%; animation: backgroundScroll 60s ease-in-out 1s;}

@keyframes backgroundScrollmob {
0% { background-position: 99% 1%; opacity:0;}
33% { background-position: 50% 50%;opacity:1;}
40% { background-position: 1% 99%; opacity:0}
66% { background-position: 99% 50%; }
75% { background-position: 99% 99%; }
100% { background-position: 50% 50%; }}
@media (max-width: 600px) {
  .backdropImage {background-size: 150% 150% cover; opacity:0 ; background-position: 99% 1%; animation: backgroundScrollmob 60s ease-in-out 1s;}
}

/*Thanks to poiaman for the fix for mobile devices below*/
@Keyframes backgroundScroll {
0% { background-position: 99% 1%; opacity: 0; filter: blur(0px); }
5% { opacity: 1; filter: blur(0px); }
33% { background-position: 50% 50%; opacity: 1; filter: blur(0px); }
40% { background-position: 99% 99%; opacity: 0; filter: blur(0px); }
66% { background-position: 50% 50%; filter: blur(0px); }
75% { background-position: 1% 1%; filter: blur(0px); }
100% { background-position: 50% 50%; opacity: 0.5; filter: blur(5px); } 
}

.backdropImage {
background-size: cover;
opacity: 0;
background-position: center center; 
animation: backgroundScroll 60s ease-in-out 0s; 
filter: blur(0px); 
}

@Keyframes backgroundScrollmob {
0% { background-position: 99% 1%; opacity: 0; filter: blur(0px); }
5% { opacity: 1; filter: blur(0px); }
33% { background-position: 50% 50%; opacity: 1; filter: blur(0px); }
40% { background-position: 1% 99%; opacity: 0; filter: blur(0px); }
66% { background-position: 99% 50%; filter: blur(0px); }
75% { background-position: 99% 99%; filter: blur(0px); }
100% { background-position: 50% 50%; opacity: 0.5; filter: blur(5px); } 
}

@media (max-width: 600px) {
.backdropImage {
background-size: cover;
opacity: 0;
background-position: center center;
animation: backgroundScrollmob 60s ease-in-out 0s;
filter: blur(0px);
}
}
```
Just paste that into your custom CSS in the General tab of your Jellyfin admin dashboard and click save.

---

## Default user page size

In your web root, find and edit your `main.xxxxxxxxxxxx.bundle.js` by running:

```sh
sudo nano main.*.bundle.js
```

Then, find:
```js
this.get("libraryPageSize",!1),10);return 0===t?0:t||100}
```

And change it to this (300 in this example):

```js
this.get("libraryPageSize",!1),10);return 0===t?0:t||300}
```

You can modify the number from 100 to any number you want the user default to be.

Save the file and reload the cache on your clients to see your changes.

---

## Change the favicon

<img width="150" alt="Screenshot 2024-05-19 175358" src="https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/48c33a4b-4458-41ce-a240-11a36b268b85">


As of a recent update, the favicon now lives in the web root as a random string followed by .ico

Thankfully, it is the only (should be the only) .ico in there, so run the following command inside your web root to find it:
`ls | grep .ico` 

Copy the output of this command, as this is what you will name your custom favicon file.

Now, simply grab your new favicon from wherever and save it to your web root named as the output of the previous grep command. This may require you to either use a volume to map that file to the new file, or simply just replace the file using a new volume that isn't web root in the Docker and mapped to a transfer folder on your server.

Example:

`./transfer:/jellyfin/transfer`

Then you would simply do the following inside the web root after you have created the .ico in the transfer folder on your host. (This only applies to Docker. If you installed without Docker, just replace the file like you would any other file.) 

Run this command from within web root `cp /jellyfin/transfer/*.ico ./`

This will copy the .ico from your transfer folder to the web root without having to do any other weird fancy tricks.

Reload the cache on your clients to see your changes.

---

## OMG seasonal themes are back

This is currently being revived so no auto scripts, yet... There may be bugs so please let me know and submit issues.

**Installation:**
First, in the web root you need to create a 'seasonal' folder and fill it with the contents of the 'seasonal' folder from this repo. Once you do that, to activate a theme just add the following to your 'index.html' just before the final `</body></html>` tags 

### Snowstorm

![snowstorm](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/e0bab815-c273-49c6-ba7e-79e5ebae3c62)

To apply the snowstorm theme simply add:

```html
<script src="seasonal/snowstorm.js"></script>
```
then add this custom css to your custom css entry in the admin panel

```
/*fix snowstorm*/
.content-primary, .padded-bottom-page, .page, .pageWithAbsoluteTabs .pageTabContent {  z-index: 4;}
.videoPlayerContainer {  z-index: 3;}
.skinHeader.osdHeader {    z-index: 5 !important;}
.backgroundContainer { z-index: 0 !important;}
.htmlvideoplayer {  z-index: 3;}
```

### Snowflakes

![snowflakes](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/e171aa80-8185-45ff-a6a8-eb08ea4e9c88)

To apply the snowflakes theme simply add:
```html
<link rel="stylesheet" href="seasonal/snowflakes.css">
<snowflake><div class="snowflakes" aria-hidden="true">  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">  ❅  </div>  <div class="snowflake">  ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div>  <div class="snowflake">    ❅  </div>  <div class="snowflake">    ❆  </div></div></snowflake>
```

### Fireworks

![fireworks](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/8bbaaec8-3277-48c4-a79a-d8ab1ab37199)

To apply the fireworks theme simply add:

```html
<snowflake><div class="pyro">  <div class="before"></div>  <div class="after"></div></div></snowflake>
<link rel="stylesheet" href="seasonal/fireworks.css">
```

Note: A known bug with fireworks is they don't scroll with the user, they stay near the top of the page, and may cause infinite loading due to a JS bug... this does need fixing.

### Hearts 

To apply the hearts theme simply add:

```html
<link rel="stylesheet" href="seasonal/hearts.css">
<snowflake><div class="snowflakes" aria-hidden="true"><div class="snowflake">  ❤️  </div>  <div class="snowflake">  ❤️  </div>  <div class="snowflake">  ❤️  </div>  <div class="snowflake"> ❤️  </div>  <div class="snowflake">  ❤️  </div>  <div class="snowflake">  ❤️  </div>  <div class="snowflake">    ❤️  </div>  <div class="snowflake">    ❤️  </div>  <div class="snowflake">    ❤️  </div>  <div class="snowflake">   ❤️  </div>  <div class="snowflake">    ❤️  </div>  <div class="snowflake">    ❤️  </div></div></snowflake>
```

### Halloween

![halloween](https://github.com/BobHasNoSoul/jellyfin-mods/assets/23018412/ad5eb524-395a-440e-bb0f-4fe846493793)

To apply the Halloween theme simply add:

```html
<link rel="stylesheet" href="/web/seasonal/halloween.css">
<snowflake><div class="snowflakes" aria-hidden="true">  <div class="snowflake">  <img src="/web/seasonal/ghost_20x20.png">  </div>  <div class="snowflake">  <img src="/web/seasonal/bat_20x20.png"> </div>  <div class="snowflake">  <img src="/web/seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">  <img src="/web/seasonal/ghost_20x20.png"> </div>  <div class="snowflake">  <img src="/web/seasonal/bat_20x20.png">  </div>  <div class="snowflake">  <img src="/web/seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">    <img src="/web/seasonal/ghost_20x20.png">  </div>  <div class="snowflake">    <img src="/web/seasonal/bat_20x20.png">  </div>  <div class="snowflake">    <img src="/web/seasonal/pumpkin_20x20.png">  </div>  <div class="snowflake">    <img src="/web/seasonal/ghost_20x20.png"> </div>  <div class="snowflake">    <img src="/web/seasonal/bat_20x20.png">  </div>  <div class="snowflake">    <img src="/web/seasonal/pumpkin_20x20.png">  </div></div></snowflake>
```

TO DO: Automation scripts that crontab in and out these effects for holidays and seasons.

---

## Bugfixes / Workarounds

### Xbox won't play a lot of files due to "Fatal playback error"

This bug is due to the Edge browser being identified incorrectly on the Jellyfin server. Jellyfin thinks it is Chromium (which is correct to an extent seeing as it is based on Chromium) but it is missing a few of the features it needs, such as functioning to surround sound. To fix this, you just need to set your `audio channels` to `stereo` in your `profile > playback` settings in your Xbox's Edge browser. Hit save and it will play the files without any issues. (Note that you may still see a few hls issues reported in the log for FFmpeg, but that is just a warning, not an error, and can be ignored.)

### Fix Live TV by changing the fmp4 container for all users

Have you experienced HDHomeRun audio sync issues, or stutter on playback from IPTV even if its from a Gtmedia tuner on your own LAN?
So did I until I saw that this is a known bug in the 10.9 version of Jellyfin that has the fmp4 container used for Live TV and found the fix was to disable fmp4 container for each user. However, you can set this by default by editing the playback config.

In your web root run:

```sh
sudo nano user-playback.*.chunk.js
```

Then find:

```js
e.querySelector(".chkPreferFmp4HlsContainer").checked=i.preferFmp4HlsContainer()
```

And replace it with:

```js
e.querySelector(".chkPreferFmp4HlsContainer").checked==i.preferFmp4HlsContainer()
```

Save the file and reload the cache on your clients to see your changes.

---

## Some extra tools to be used with Jellyfin
These are some extremely helpful tools that can be used with Jellyfin to increase functionality.
### Jfa-Go
This is a Jellyfin account management tool that can be used to generate links to invite people to your Jellyfin server and allow them to create their own username and password. It's written in Go and can be installed on most OS's. You can get it here: https://github.com/hrfee/jfa-go
### Jellyseerr
A free and open source software application for managing requests for your media library. After adding a custom link in the side bar, when your friends or family want to request media, they can request it using Jellyseerr, which also integrates with Radarr, Sonarr, and other relevant services. You can get it here: https://github.com/Fallenbagel/jellyseerr
### Ombi
A legacy alternative to Jellyseerr, Ombi is a media requesting service that can be used with Jellyfin. You can get it here: https://github.com/Ombi-app/Ombi
### ErsatzTV
ErsatzTV is a bit like PseudoTV for Kodi but more like a Live TV media server. You can get it here: https://github.com/jasongdove/ErsatzTV
### Intro Skipper
Intro Skipper plugin analyzes the audio of television episodes to detect and skip over intros. You can get it here: https://github.com/intro-skipper/intro-skipper
### Jellyfin-Announce
This script sends a message to all currently active users that are watching media. (For example, I use this to inform users the server will be shutting down for maintenance in 60 mins, then 30 mins, then 10 mins, 5 min, 4 min, 3 min, and so on. This is easily setup with basic configuration.) You can get it here: https://github.com/BobHasNoSoul/Jellyfin-Announce
