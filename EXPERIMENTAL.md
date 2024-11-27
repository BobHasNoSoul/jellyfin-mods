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
