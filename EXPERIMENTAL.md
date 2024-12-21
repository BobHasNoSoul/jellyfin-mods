[YOU ARE READING CLIFF NOTES FOR BOB TO FILL OUT LATER]

this is a placeholder for a new tutorial and maybe other tutorials that are very... tech heavy not for the faint of heart not hands to be held here

name of the new guide: How to seriously speed up jellyfins loading and search using your servers ram as a ramdisk linux [requires a lot of ram AND EVEN MORE FOR MASSIVE LIBARIES]

(no i dont know how to do this on windows, i dont own a windows server with enough ram to even attempt this on windows)

simple guide that needs flushing out

0. BACKUP YOUR METADATA FOLDER AND WEB FOLDER.. no seriously back them up to a seperate folder incase you mistype one of the commands or skip a step
1. creating the mountpoint for the ramdisk (for the love of megabytes set the damn size correctly)
2. seting up the ramdisk in fstab and mounting it
3. setting it up with an initial copy of the data so you dont need a reboot
4. setting up the rsync service at the start so when booted it will load all the data from a hdd to the ramdisk (we call this persistance)
5. setting up periodic crontab for 15 min intervals so the only amount of info you could possibly lose is the last 15 mins in the event of a power cut
6. maybe use inotify to detect changes and get rid of the crontab for sync.. they do the samething but one is scanning inotify for changes to files then sending them or deleting them etc.
 

does this actually speed it up? yes it does.
does this make my slow 1mbps upload work better? no.. get a better isp.
do i need this? no but it is cool and a nice upgrade even if it is a little weird to do.
can you make this easier for me on docker / windows? nope the guide is provided as is for the experimental and brave of you do not attempt if you have no clue what the things mean on the screen

thanks to a friend for giving me the weird idea to mull over and then implement and test.. i would name drop but im unsure how they would feel about it.

FLUSHED OUT GUIDE 21.12.24

Verify Available Memory seriously dont just throw a random number in there make sure you have the space availible i use 30GB but i have a lot of ram.

Create the Mount Point `sudo mkdir -p /mnt/ramdisk`

Now you need to mount it but you seriously.. seriously guys make sure you change yours to the free ram note if you use it like i do it will have to be large amount of ram so change the size part for your own size you need on your system.. i will not even respond if you do not have enough free ram to do this i am not you babysitter or your dad. `sudo mount -t tmpfs -o size=30G tmpfs /mnt/ramdisk`
change permissions so jellyfin can use it without having a fit. `sudo chmod 777 /mnt/ramdisk`

Automatically Mount at Boot (Optional)

`sudo nano /etc/fstab` Add the following line at the end of the file
obviously adjust the size like before for your own system!
`tmpfs   /mnt/ramdisk   tmpfs   defaults,size=30G   0   0`
Save and exit (Ctrl+O, Enter, Ctrl+X).

now you need to write a simple bash script to make it load the things to it and from it like a sync so you dont lose loads of data

if you are only using this for transcoding.. you do not need to do this step but if you are using it for webui and metadata then continue.

create a new location that it will sync to for example in a non privilaged folder like /home/USERNAMEHERE/jellyfinramdisksync just adjust to your username

so now add this to `sudo crontab -e` 

`*/15 * * * * rsync -avh --delete /mnt/jellyfinweb/ /home/USERNAMEHERE/jellyfinramdisksync/`

this will sync all new files to the jellyfin ram disk every 15 mins to that new sync dir.. this is a good thing this lets you restore it on restart 

now you need to initialise the first set of files to it this will do the jellyfinweb and jellyfinmetadata 

for jellyfin-web:
`sudo rsync -av --delete /var/www/html/ /mnt/jellyfinramdisk/web/`

for the metadata:
`sudo rsync -av --delete /var/lib/jellyfin/metadata/ /mnt/jellyfinramdisk/metadata/`

now with that we have one last step which is needed on reboot you need to have this ran via sudo crontab -e 

`@reboot rsync -av --delete /home/USERNAMEHERE/jellyfinramdisksync/ /mnt/jellyfinramdisk/`

this lets the ram disk get mounted then populated at reboot fairly quickly

