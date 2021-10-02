# Deploy Rechords

Deploy [Rechords](https://github.com/bskp/rechords) on a virtual private server (VPS)!

## Requirements:

- Virtual private server
- SSH access setup [using a key file](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- Domain name and DNS

## Initial deployment
1. Rename ``template.env`` to ``.env`` and customize its contents
2. Set up a DNS for the desired ``DOMAIN`` pointing to your VPS
3. Reverse Proxy [Caddy](https://caddyserver.com) running and configured to include any files in ``/etc/caddy/mup-sites/``
4. **New Servers only**: run ``mup setup``
5. Deploy using:
~~~
$ mup deploy
~~~

### What happens now?
- The script ``clone_and_isntall_repo.sh`` is run:
- A shallow copy of the Rechords-Repository gets checked out
- npm dependencies are installed
- [Meteor Up](http://meteor-up.com) builds a Docker image with
  - Node Server
  - MongoDB Server
- The image is transferred to the server
- A caddy reverse proxy is set up accordingly

## Dump Production Database
~~~
$ ./create_backup.sh
~~~

## Restore Production Database

**Danger Zone**: This action drops any data on the target database!

~~~
$ ./restore_from_backup.sh 21-03-31.gz [namespace in dump]
~~~

The dumps' namespace equals the configured domain in .env, with all dots (.) replaced as hyphens (-):
- ``Rechords`` for legacy deployments
- ``testing-hoelibu-ch`` for the testing deployment
- ``hoelibu-ch`` for the productive deployment
