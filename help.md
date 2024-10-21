# Specific Locations

This section is to show how to access the files needed for jellyfin-mods, regardless of OS and installation type.

---

## Linux (Native install)
This is the basic `apt/dnf install` installation of Jellyfin. Your web root server files are usually located at `/usr/share/jellyfin/web/`. (This will be where your 'main.*.bundle.js' is located.)

--- 

## Docker (Linux and Jellyfin official image)
This is a little bit more complicated that the native install method, but not too complex. This method requires a few more steps, and follow along closely because by default these files cannot be easily edited without first mounting them.

First, we make the directories needed with:

`sudo mkdir ${HOME}/Docker && sudo mkdir ${HOME}/Docker/jellyfin && sudo mkdir ${HOME}/Docker/jellyfin/jellyfin-web`

Then, create the mount for it with:

````
sudo docker volume create --driver local \
--opt type=none \
--opt device=${HOME}/Docker/jellyfin/jellyfin-web \
--opt o=bind \
tool_vol
````

Then, start the container with:

`sudo docker run -it -v tool_vol:/jellyfin/jellyfin-web jellyfin/jellyfin`

Now, all relevant files will be in your `${HOME}/Docker/jellyfin/jellyfin-web` directory. (This will be where your 'main.*.bundle.js' is located. You can substitute this path instead of `/usr/share/jellyfin/web` in the main guide.)

---

## Windows

Note that this method requires a few modifications to the guide, such as using Notepad ++ to replace text, and running Notepad++ as admin. Your web root files are located at `C:\Program Files\Jellyfin\Server\jellyfin-web\`. (This will be where your 'main.*.bundle.js' is located. You can substitute this path instead of `/usr/share/jellyfin/web` in the main guide.)
