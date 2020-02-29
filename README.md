# How To Build A URL Shortener With Node.js, Express, and MongoDB

As seen on [Youtube](https://www.youtube.com/watch?v=SLpUKAGnm-g)

## MongoDB on your DevMachine with Docker

if you have Docker installed, simply run 

```bash
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest
```

_*you might eed to pre-append `sudo` if in a *nix machine_

This command will:

- pull `mongo:latest` image
- redirect ports 27017 to 17019 to your host with the same ports (make sure nothing is using such ports, like a physical instance of MongoDB)
- name the container as `mongodb`
- run as in the background (detached mode) so you can easily connect to it

To start/stop the container, simply run `docker start mongodb` or `docker stop mongodb`

Warning: as we've not specified a data volume, every time you restart your machine the database will be empty

***

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/WebDevSimplified/url-shortener)
