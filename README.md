# Mindsmeet - Africa - Frontend

## Installation

### Brief manual

Requirements:
    Node >= 0.8.0

Go to project directory:

    cd /somewhere/my_project/

Install `node` requirements::

    npm install

Create `localsettings.js`:

    cp app/localsettings.js.sample app/localsettings.js

Run application: (sudo is required for access to port 80)

    sudo grunt

Browser should popup automatically, if not go to:

    http://localhost

### Detailed manual for Ubuntu/Debian

#### Warnings:
**Don't** do this!!:

    `sudo apt-get install npm`

> This version of node isn't supported anymore. Won't work on Ubuntu and
probably others.

and
> I strongly encourage you not to do package management with sudo! Packages
> can run arbitrary scripts, which makes sudoing a package manager command
> as safe as a chainsaw haircut. Sure, it's fast and definitely going to cut
> through any obstacles, but you might actually want that obstacle to stay
> there.

Also should see:
[Introduction to npm](http://howtonode.org/introduction-to-npm)

---
#### Installing pre-requirements:

Note: Example is suitable for Ubuntu 13.04

Download node sources form:

    http://nodejs.org

Unpack sources:

    tar -zxf node-v0.10.20.tar.gz

Grand `/usr/local` to your user.

    sudo chown $USER -R /usr/local

Install and set path for node and node modules.

    ./configure --prefix=/usr/local && make && make install

In case of access denied error repeat grand privileges command and install again:

    sudo chown $USER -R /usr/local

Now you should be able to use node and npm, lets check it:

    /usr/local/bin/npm

You should see help page of npm.

Finally install globally grunt, yo and bower:

    cd ~
    /usr/local/bin/npm install -g yo grunt-cli bower grunt-devserver

----
#### Installation

Clone repository code into your project folder:

    cd ~ && git clone git@github.com:COSVentures/Agonyapp-mobile.git ~/projects/agonyapp-mobile

Install `node` requirements::

    cd ~/projects/agonyapp-mobile
    /usr/local/bin/npm install

Install project javascript libraries:

    bower install

Create `localsettings.js`:

    cp app/localsettings.js.sample app/localsettings.js

Run application: (sudo is required for access to port 80)

    sudo grunt devserver

Preview in browser:

    http://localhost/preview/


## Deploy

To deploy project you have to prepare application to be deployed.
Usually the ready application is in `dist` directory and `grunt build` is
a tool that prepares `dist`. Since we don't have working `grunt build`, we
copy working directory into dist folder.

    cp app/* dist/

In order to use deploy script you have to install Fabric library. The
recommended way is to install python library Fabric.

    pip install fabric

To run deploy script type:

    fab -f fabfile-staging.py deploy
