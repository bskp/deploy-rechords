# Deploy Rechords

Deploy [Rechords](https://github.com/bskp/rechords) on a virtual private server (VPS)!

## Requirements:

- Virtual private server
- SSH access setup [using a key file](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- Domain name and DNS

## Initial deployment
1. Rename ``template.env`` to ``.env`` and customize its contents
2. Set up a DNS for the desired ``DOMAIN`` pointing to your VPS
3. **New Servers only**: run ``mup setup``
4. Deploy using:
~~~
$ mup deploy
~~~

###What happens now?
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
$ ./backup.sh
~~~

## Restore Production Database

(TODO)

## Restore DB-Dump to local MongodB

- Install mongodb-database-tools (cli client tools)
- Start Meteor (Meteor starts its own lightweight dev mongoserver)
- `meteor mongo` will show you the connection to mongodb (port and DB-Name)
- Use the mongorestore command
```
mongorestore --port 3001 --gzip --archive=backups/00-00-00.gz 
mongorestore --port 3001 --archive=../backups/asdf.bson --nsFrom=Rechords.* --nsTo=meteor.* --drop
```
- This changes the DB's name from ``Rechords`` to ``meteor``, as it is expected by a locally running development server.



