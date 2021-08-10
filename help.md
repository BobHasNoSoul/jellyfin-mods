# Specific Locations

This section is to show how to get to the same files needed in jellyfin-mods regardless of OS and installation type.

---

## Linux (native install)
This is the basic `apt install` version for this your web root server files are usually located at `/usr/share/jellyfin/web/` this will be where your main.*.bundle.js file is located.

--- 

## Docker (Linux and jellyfin official image)
This is a little bit more complicated that the native install method but not too complex, for this you will need to do a few more steps but just follow along because by default these files cannot be edited easily without first mounting them.

first we make the directories needed with:

`sudo mkdir ${HOME}/Docker && sudo mkdir ${HOME}/Docker/jellyfin && sudo mkdir ${HOME}/Docker/jellyfin/jellyfin-web`

and then create the mount for it with

````
sudo docker volume create --driver local \
--opt type=none \
--opt device=${HOME}/Docker/jellyfin/jellyfin-web \
--opt o=bind \
tool_vol
````

then you need to run a new terminal window to start the container with

`sudo docker run -it -v tool_vol:/jellyfin/jellyfin-web jellyfin/jellyfin`

then you will have all the files in your `${HOME}/Docker/jellyfin/jellyfin-web` directory (this will be where main.*.bundle.js is located and you can subsitute this path instead of /usr/share/jellyfin/web in the main guide)

---

## Windows

This one needs a few modifications to the guide (like using notepad ++ to replace text and running notepad++ as an admin) but your web root files are availible here `C:\Program Files\Jellyfin\Server\jellyfin-web\` this is where your main.xxxxxxxxxxxxxx.bundle.js is located so you can use that instead of /usr/share/jellyfin/web in the main guide.
