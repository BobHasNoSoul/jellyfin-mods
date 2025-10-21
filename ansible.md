# Automating `jellyfin-mods` with Ansible

This guide is aimed at those who wish to automate the mods of this repository so that they persist across version updates.

To do this, we're going to make use of [Ansible](https://www.ansible.com/) playbooks which are YAML files that automate certain
Linux tasks. In this case they will be used to update packages, modify javascript files within `jellyfin-web` and copying files/directories
to the `jellyfin-web` directory.

## ⚠️ IMPORTANT

- In this guide, I will refer to **"remote machine"** and **"host machine"** a lot. To clarify what this means, the remote machine is the one you will run Ansible from, the host machine is the one which has your Jellyfin instance installed on it.
- For the time being, these playbooks are designed for Jellyfin version >10.10.0 on a bare-metal Debian install. Please create pull requests
if you'd like to contribute playbooks for other environments. That said, most of these tasks, with the exception of package updates and systemd service events should work on most Linux distros.
- This does not include every mod (yet). Please create an issue or pull request if there's a particular one you'd like to be added.
- Do not rely on this to work forever, the Jellyfin team often make mod-breaking changes across versions (especially major versions). Running these playbooks in this case may cause Jellyfin or parts of it to stop working, in which case there is a playbook at the bottom of this document which you can run to reinstall the `jellyfin-web` package, which should restore all the modified files to their original state.
- These playbooks come in the form of snippets within this document and not complete YAML files. The reasoning for this is that the user should only add snippets they want, and some snippets require the user to edit certain strings in order to match their configuration. Copy the snippets one by one into your own `jellyfin-mods.yaml` file.

## Prerequisites

- Jellyfin version >10.11.0 (including `jellyfin-server`, `jellyfin-web` and `jellyfin-ffmpeg7`) on the host machine.
- A remote machine to run the playbook from. I believe there are ways to run Ansible locally but as far as I know the intent is to run it remotely and thus I have written the files with this in mind.
- [SSH keys](https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/) from remote to host machine.
- Ansible Core or Ansible Full ([install instructions](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html)) on the remote machine.
- An Ansible [`inventory` file](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html) for the remote machine. This file should contain the IP or hostname of your host machine and be placed in the same directory as your `jellyfin-mods.yaml` file for ease of use.

## Recommended directory structure

For ease of use, here's an example of how I have these files arranged on my remote machine:

```
/home/jane/
├─ jellyfin-mods
│   ├── inventory
└── └── jellyfin-mods.yaml
```

## Running the playbook

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

## Snippets

### ⚠️ IMPORTANT

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
          - jellyfin-ffmpeg7
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

## Find files with variable names

Some of the files we're editing will change names depending on the version we're updating to/from. Therefore we should add steps which look for those files and then call on them when needed.

```yaml
    - name: Finding the 73233.*.chunk.js file...
      ansible.builtin.find:
        paths: /usr/share/jellyfin/web/
        patterns: '73233.*.chunk.js'
      register: chunk_73233_js_file
```

```yaml
    - name: Finding session-login-index-html.*.chunk.js file...
      ansible.builtin.find:
        paths: /usr/share/jellyfin/web/
        patterns: 'session-login-index-html.*.chunk.js'
      register: session_login_chunk_js_file
```

```yaml
    - name: Finding the main.jellyfin.*.css file...
      ansible.builtin.find:
        paths: /usr/share/jellyfin/web/
        patterns: 'main.jellyfin.*.css'
      register: main_jf_css_file
```

## Copy directory with custom branding assets to `jellyfin-web` in order to change logo icons and images

For this one, you will need a pre-made directory with all the files you want to replace inside the `jellyfin-web` directory. It should look like this:

```
/home/jane/jellyfin-logos/
├── banner-dark.31011bc0c5e6acb07879.png
├── banner-light.b113d4d1c6c07fcb73f0.png
├── favicon.bc8d51405ec040305a87.ico
├── favicons
│   ├── touchicon.png
│   ├── touchicon114.png
│   ├── touchicon144.png
│   ├── touchicon512.png
│   └── touchicon72.png
├── icon-transparent.baba78f2a106d9baee83.png
├── notificationicon.d6ecf2254db85ff3b545.png
├── touchicon.f5bbb798cb2c65908633.png
└── touchicon144.39209dd2362c0db7c673.png
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
        regexp: 'enableBackdrops:function\(\){return D}'
        replace: "enableBackdrops:function(){return R}"
      become: true
```

## Add banner image to the Jellyfin sidebar

If you have set up [this section](#copy-directory-with-custom-branding-assets-to-jellyfin-web-in-order-to-change-logo-icons-and-images) correctly, or if you want to use the stock Jellyfin logo you do not need to edit anything in this snippet. Otherwise, replace the URL in `img src="/web/banner-light.b113d4d1c6c07fcb73f0.png"` with the URL to a different image. As the name of the file we're trying to modify here changes in different Jellyfin versions, we have to look for it using known patterns. Please ensure you have added the step from [here](#find-files-with-variable-names) before proceeding.

```yaml
    - name: Adding banner to sidebar...
      ansible.builtin.replace:
        path: "{{ item.path }}"
        regexp: >-
          <div style="height:\.5em;"><\/div>
        replace: >-
          <div style="height:.5em;"></div>',n+='<a href="#/home.html">
          <img src="/web/banner-light.b113d4d1c6c07fcb73f0.png"
          width=250px style="padding:5px;display:block;
          margin-left: auto; margin-right: auto;
          margin-top: 10px; margin-bottom: 10px;"></a>
      become: true
      loop: "{{ chunk_73233_js_file.files }}"
```

## Add logo to login page

If you have set up [this section](#copy-directory-with-custom-branding-assets-to-jellyfin-web-in-order-to-change-logo-icons-and-images) correctly, or if you want to use the stock Jellyfin logo you do not need to edit anything in this snippet. Otherwise, replace the URL in `img src="/web/banner-light.b113d4d1c6c07fcb73f0.png"` with the URL to a different image. Just like the previous step, let's find the file using known patterns.

```yaml
    - name: Adding logo to login page...
      ansible.builtin.replace:
        path: "{{ item.path }}"
        regexp: '<div class="padded-left padded-right padded-bottom-page margin-auto-y">'
        replace: >-
           <div class="padded-left padded-right padded-bottom-page margin-auto-y">
           <img src=/web/banner-light.b113d4d1c6c07fcb73f0.png" width=350px
           style="padding:0px;display:block; margin-left: auto; margin-right: auto;">
      become: true
      loop: "{{ session_login_chunk_js_file.files }}"
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

NOTE: If you're using a different Jellyfin theme than `dark`, you must edit the file path in the second step of this snippet to the theme you're using (or you can duplicate the second step for every theme inside `/usr/share/jellyfin/web/themes/`). As the name of the file we're trying to modify here changes in different Jellyfin versions, we have to look for it using known patterns. Please ensure you have added the step from [here](#find-files-with-variable-names) before proceeding.

```yaml
    - name: Replacing banner with icon (1/2)...
      ansible.builtin.replace:
        path: "{{ item.path }}"
        regexp: '{\.splashLogo{background-image:url\(banner-light\.b113d4d1c6c07fcb73f0\.png\)}}'
        replace: "{.splashLogo{background-image:url(icon-transparent.baba78f2a106d9baee83.png)}}"
      become: true
      loop: "{{ main_jf_css_file.files }}"

    - name: Replacing banner with icon (2/2)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/themes/dark/theme.css
        regexp: 'url\(\.\./\.\./banner-light\.b113d4d1c6c07fcb73f0\.png\)'
        replace: "url(../../icon-transparent.baba78f2a106d9baee83.png)"
      become: true
```

## Change Jellyfin's page title

In this snippet you need to change every instance of `CHANGEME` to whatever you want your new page title to be. Again, be mindful of [finding files with variable names](#find-files-with-variable-names).

```yaml
    - name: Changing page title (part 1/4)...
      ansible.builtin.replace:
        path: "{{ item.path }}"
        regexp: 'document\.title=de'
        replace: 'document.title="CHANGEME"'
      become: true
      loop: "{{ chunk_73233_js_file.files }}"

    - name: Changing page title (part 2/4)...
      ansible.builtin.replace:
        path: "{{ item.path }}"
        regexp: 'document\.title=e\|\|de'
        replace: 'document.title=e||"CHANGEME"'
      become: true
      loop: "{{ chunk_73233_js_file.files }}"
    - name: Changing page title (part 3/4)...
      ansible.builtin.replace:
        path: /usr/share/jellyfin/web/index.html
        regexp: '<meta name="application-name" content="Jellyfin">'
        replace: >-
          <meta name="application-name" content="CHANGEME">
      become: true
    - name: Changing page title (part 4/4)...
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
