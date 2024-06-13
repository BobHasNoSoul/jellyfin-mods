# Automating `jellyfin-mods` with Ansible.

This guide is aimed at those who wish to automate the mods of this repository so that they persist across version updates.

To do this, we're going to make use of [Ansible](https://www.ansible.com/) playbooks which are YAML files that automate certain
Linux tasks. In this case they will be used to update packages, modify javascript files within `jellyfin-web` and copying files/directories
to the `jellyfin-web` directory.

## ⚠️ IMPORTANT

- In this guide, I will refer to **"remote machine"** and **"host machine"** a lot. To clarify what this means, the remote machine is the one you will run Ansible from, the host machine is the one which has your Jellyfin instance installed on it.
- For the time being, these playbooks are designed for Jellyfin version >10.9.5 on a bare-metal Debian install. Please create pull requests
if you'd like to contribute playbooks for other environments. That said, most of these tasks, with the exception of package updates and systemd service events should work on most Linux distros.
- This does not include every mod (yet). Please create an issue or pull request if there's a particular one you'd like to be added.
- Do not rely on this to work forever, the Jellyfin team often make mod-breaking changes across versions (especially major versions). Running these playbooks in this case may cause Jellyfin or parts of it to stop working, in which case there is a playbook at the bottom of this document which you can run to reinstall the `jellyfin-web` package, which should restore all the modified files to their original state.
- These playbooks come in the form of snippets within this document and not complete YAML files. The reasoning for this is that the user should only add snippets they want, and some snippets require the user to edit certain strings in order to match their configuration. Copy the snippets one by one into your own `jellyfin-mods.yaml` file.

## Prerequisites
- Jellyfin version >10.9.5 (including `jellyfin-server`, `jellyfin-web` and `jellyfin-ffmpeg6`) on the host machine.
- A remote machine to run the playbook from. I believe there are ways to run Ansible locally but as far as I know the intent is to run it remotely and thus I have written the files with this in mind.
- [SSH keys](https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/) from remote to host machine.
- Ansible Core or Ansible Full ([install instructions](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html)) on the remote machine.
- An Ansible [`inventory` file](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html) for the remote machine. This file should contain the IP or hostname of your host machine and be placed in the same directory as your `jellyfin-mods.yaml` file for ease of use.


# Recommended directory structure
For ease of use, here's an example of how I have these files arranged on my remote machine:
```
/home/jane/
├─ jellyfin-mods
│   ├── inventory
└── └── jellyfin-mods.yaml
```

# Running the playbook

With all the prerequisites fulfilled and your files created, navigate to the directory holding these files in your remote machine's terminal and run the following:

```sh
ansible-playbook -K -i inventory jellyfin-mods.yaml
```

`-K` tells Ansible to ask for a sudo password. It needs to do this as many of the steps we're about to perform require root access, just the same as it does when performing these mods without Ansible.

`-i` specifies the inventory file which is needed to tell Ansible which machine to perform these tasks on.

Ansible will now ask for the sudo password of the user on the host machine by querying `BECOME password:`. Type it in and press enter. Then Ansible will perform each step specified in your `jellyfin-mods.yaml` file on the host machine.
I recommend linting and checking your files first. You can do this by issuing these commands:
```sh
ansible-lint jellyfin-mods.yaml
ansible-playbook -C -D -K -i inventory jellyfin-mods.yaml
```
`-C` specifies a dry run of the playbook, as in running it without performing any changes. `-D` will display a diff on all the files you change.

# Snippets

## ⚠️ IMPORTANT

YAML files are whitespace sensitive. In order to avoid issues, make sure this is respected.
You can lint your playbook before running it by issuing the following command:

```sh
ansible-lint jellyfin-mods.yaml
```

## Start of file

This ansible playbook requires certain global parameters to be set before we can add any other snippets. This needs to be added to the very top of your playbook file like this:
```yaml
---
- name: jellyfin-mods
  hosts: all
  remote_user: jane

  tasks:
```
You must edit the `remote_user: jane` section, replacing `jane` with the username on your host machine you intend to run the playbook as. This user must have `sudo` access as the files we intend to edit are owned by root. The rest can be left as is.

## Update Jellyfin packages with Aptitude

I recommend making this the first task to automate version updating, however if you're already running the latest packages this task won't do anything anyway, so it's up to you.
```yaml
    - name: Updating "jellyfin" packages...
      ansible.builtin.apt:
        name:
          - jellyfin
          - jellyfin-server
          - jellyfin-web
          - jellyfin-ffmpeg6
        state: latest
        update_cache: true
      become: true
```

## Stop the `jellyfin` systemd service before making modifications
This should be included in any playbook that edits javascript files as the changes may not apply or persist if jellyfin is running at the same time. At the bottom of this document you will find a snippet that starts jellyfin back up after the modifications have been made. If you're going to use this you should also use the other as jellyfin otherwise won't run after the changes have been made.

```yaml
    - name: Stopping Jellyfin Service...
      ansible.builtin.service:
        name: jellyfin
        state: stopped
      become: true
```


## Copy directory with custom branding assets to `jellyfin-web` in order to change logo icons and images.

For this one, you will need a pre-made directory with all the files you want to replace inside the `jellyfin-web` directory. It should look like this:

```
/home/jane/jellyfin-logos/
├── 065a953504e441fe245c.png
├── 0b37f660ac0f7f01ab41.png
├── 0d2b37694d352e7e4c59.svg
├── 0df719b48efcaef953df.png
├── 106a7abc109fb5e78742.png
├── 142d834c201895a46a01.png
├── 16fc81178d1aee54f6cc.png
├── 23a72f5d56f82554aeab.png
├── 379bab68d056910336f9.png
├── 39209dd2362c0db7c673.png
├── 3f3fe0fd3a0b637b5030.png
├── 3fa90c593184d5737eb3.png
├── 6a2e2e6b4186720e5d4f.png
├── 6de874568a98308c4a74.png
├── 74ce2b743c33a4197e5c.gif
├── a962662957ebbb8eb436.png
├── assets
│   ├── img
│   │   ├── banner-dark.png
│   │   ├── banner-light.png
│   │   └── icon-transparent.png
│   └── splash
│       ├── ipadpro1_splash_l.png
│       ├── ipadpro1_splash.png
│       ├── ipadpro2_splash_l.png
│       ├── ipadpro2_splash.png
│       ├── ipadpro3_splash_l.png
│       ├── ipadpro3_splash.png
│       ├── ipad_splash_l.png
│       ├── ipad_splash.png
│       ├── iphone5_splash_l.png
│       ├── iphone5_splash.png
│       ├── iphone6_splash_l.png
│       ├── iphone6_splash.png
│       ├── iphoneplus_splash_l.png
│       ├── iphoneplus_splash.png
│       ├── iphonexr_splash_l.png
│       ├── iphonexr_splash.png
│       ├── iphonexsmax_splash_l.png
│       ├── iphonexsmax_splash.png
│       ├── iphonex_splash_l.png
│       └── iphonex_splash.png
├── baafa93a783b76e667ec.png
├── baba78f2a106d9baee83.png
├── bbb3e6d43389ba0d436c.png
├── bc8d51405ec040305a87.ico
├── cb6e840e08726299bf8f.svg
├── d0e56683308a17dba86d.png
├── d28a57b1e61f9f0dabd9.png
├── d31413d3f03c0873ccbb.png
├── d6ecf2254db85ff3b545.png
├── e62987a12a58b24f383a.png
├── eb8bef4f19b6ad227f46.png
├── f3bc149017432b87da2e.gif
├── f5bbb798cb2c65908633.png
├── f94ebf203ea0c91a47c6.png
├── favicon.ico
├── favicon.png
├── touchicon114.png
├── touchicon144.png
├── touchicon512.png
├── touchicon72.png
└── touchicon.png
```
I'm not going to detail what each of these files do, but the idea is to completely customize the branding of Jellyfin. In order to do that, copy these files FROM the `jellyfin-web` directory, open them in your image editor of choice (`.ico` files should be edited using a favicon editor) and replace the Jellyfin logo in each of them with your own.

Once you have such a folder set up, paste the following snippet into your playbook:

```yaml
    - name: Copying custom branding assets to Jellyfin Web directory...
      ansible.builtin.copy:
        src: /home/jane/jellyfin-logos/
        remote_src: true
        dest: /usr/share/jellyfin/web
        mode: preserve
      become: true
```

## Enable backdrops for all users

Enables image backdrops in Jellyfin by default for all users.

```yaml
    - name: Enabling backdrops for all users...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/main.jellyfin.bundle.js
        regexp: 'enableBackdrops:function\(\){return _}'
        replace: "enableBackdrops:function(){return P}"
      become: true
```


## Disable Next Episode info for all users

Useful if you have [intro-skipper](https://github.com/jumoog/intro-skipper) enabled with the "Skip Credits" button.

```yaml
    - name: Disabling Next Episode info for all users...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/main.jellyfin.bundle.js
        regexp: 'enableNextVideoInfoOverlay:function\(\){return I}'
        replace: "enableNextVideoInfoOverlay:function(){return _}"
      become: true
```

## Add banner image to the Jellyfin sidebar

If you have set up [this section](#copy-directory-with-custom-branding-assets-to-jellyfin-web-in-order-to-change-logo-icons-and-images) correctly, or if you want to use the stock Jellyfin logo you do not need to edit anything in this snippet. Otherwise, replace the URL in `img src="/web/assets/img/banner-light.png"` with the URL to a different image.

```yaml
    - name: Adding banner to sidebar...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/73233.4d2a29454aacb263d3bf.chunk.js
        regexp: >-
          <div style="height:\.5em;"><\/div>
        replace: >-
          <div style="height:.5em;"></div>',n+='<a href="#/home.html"><img
          src="/web/assets/img/banner-light.png" width=250px style="padding:
          5px;display:block; margin-left: auto; margin-right: auto;
          margin-top: 10px; margin-bottom: 10px;"></a>
      become: true
```

## Add logo to login page

If you have set up [this section](#copy-directory-with-custom-branding-assets-to-jellyfin-web-in-order-to-change-logo-icons-and-images) correctly, or if you want to use the stock Jellyfin logo you do not need to edit anything in this snippet. Otherwise, replace the URL in `img src="/web/assets/img/banner-light.png"` with the URL to a different image.

```yaml
    - name: Adding logo to login page...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/session-login-index-html.c73c6453a153f384f752.chunk.js
        regexp: '<div class="padded-left padded-right padded-bottom-page margin-auto-y">'
        replace: >-
           <div class="padded-left padded-right padded-bottom-page margin-auto-y">
           <img src="/web/assets/img/banner-light.png" width=350px style="padding:
           0px;display:block; margin-left: auto; margin-right: auto;">
      become: true
```

## Set pagination to infinite for all users

```yaml
    - name: Setting pagination to infinite for all users...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/main.jellyfin.bundle.js
        regexp: 'var t=parseInt\(this\.get\("libraryPageSize",!1\),10\);return 0===t\?0:t\|\|100}}'
        replace: 'var t=parseInt(this.get("libraryPageSize",!1),10);return 0===t?0:t||0}}'
      become: true
```

## Replace the logotype in the top left corner of Jellyfin with a simple icon

NOTE: If you're using a different Jellyfin theme than `dark`, you must edit the file path in the second step of this snippet to the theme you're using (or you can duplicate the second step for every theme inside `/usr/share/jellyfin/web/themes/`).

```yaml
    - name: Replacing banner with icon (1/2)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/index.html
        regexp: '{\.splashLogo{background-image:url\(assets\/img\/banner-light\.png\)}}'
        replace: "{.splashLogo{background-image:url(assets/img/icon-transparent.png)}}"
      become: true

    - name: Replacing banner with icon (2/2)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/themes/dark/theme.css
        regexp: 'url\(\.\./\.\./assets/img/banner-light\.png\)'
        replace: "url(../../assets/img/icon-transparent.png)"
      become: true
```

## Change Jellyfin's page title

In this snippet you need to change every instance of `CHANGEME` to whatever you want your new page title to be.

```yaml
    - name: Changing page title (step 1/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/73233.4d2a29454aacb263d3bf.chunk.js
        regexp: 'document\.title="Jellyfin"'
        replace: 'document.title="CHANGEME"'
      become: true

    - name: Changing page title (step 2/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/73233.4d2a29454aacb263d3bf.chunk.js
        regexp: 'document\.title=e\|\|"Jellyfin"'
        replace: 'document.title=e||"CHANGEME"'
      become: true

    - name: Changing page title (step 3/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/index.html
        regexp: '<meta name="application-name" content="Jellyfin">'
        replace: >-
          <meta name="application-name" content="CHANGEME">
      become: true

    - name: Changing page title (step 4/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/fd4301fdc170fd202474.json
        regexp: >-
          \"name\": \"Jellyfin\"
        replace: >-
          "name": "CHANGEME"
      become: true

    - name: Changing page title (step 5/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/fd4301fdc170fd202474.json
        regexp: >-
          \"short_name\": \"Jellyfin\"
        replace: >-
          "short_name": "CHANGEME"
      become: true

    - name: Changing page title (step 6/6)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/index.html
        regexp: '<title>Jellyfin<\/title>'
        replace: >-
          <title>CHANGEME</title>
      become: true
```

## Restart the `jellyfin` systemd service after making modifications
Put the following snippet at the bottom of `jellyfin-mods.yaml` if you've included [this snippet](#stop-the-jellyfin-systemd-service-before-making-modifications) at an earlier point.

```yaml
    - name: Starting Jellyfin Service...
      ansible.builtin.service:
        name: jellyfin
        state: restarted
      become: true
```

## Restoring `jellyfin-web` in case of failure

For this, create a new file in your playbook directory called `restore-jf-web.yaml`

`restore-jf-web.yaml`
```yaml
---
- name: Restore Jellyfin...
  hosts: all
  remote_user: jane

  tasks:
    - name: Reinstalling jellyfin-web (1/2)...
      ansible.builtin.apt:
        name: jellyfin-web
        state: absent
      become: true

    - name: Reinstalling jellyfin-web (2/2)...
      ansible.builtin.apt:
        name: jellyfin-web
        state: latest
        update_cache: true
      become: true
```

Again, change the user [as outlined here](#start-of-file) to a sudo user on the host machine.
Alternatively, just run the following in the host machine's shell:

```sh
sudo apt --reinstall install jellyfin-web
```
