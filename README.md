# butthub

## local dev

- install VirtualBox > 5
- [install `docker-machine`](https://docs.docker.com/machine/install-machine/#install-machine-directly)
- enable virtualization in your BIOS

create docker machines

```shell
docker-machine create -d virtualbox manager
docker-machine create -d virtualbox worker0
docker-machine create -d virtualbox worker1
```

start the swarm with the manager

```shell
docker-machine ssh manager docker swarm init --advertise-addr $(docker-machine ip manager)
```


join the swarm with each worker

```shell
docker-machine ssh worker0 docker swarm join --token $(docker-machine ssh manager docker swarm join-token worker -q) $(docker-machine ip manager)
docker-machine ssh worker1 docker swarm join --token $(docker-machine ssh manager docker swarm join-token worker -q) $(docker-machine ip manager)
```

check out your swarm!

```shell
docker-machine ssh manager docker node ls
```

get ready to use your local docker command to impersonate the manager node

```shell
eval $(docker-machine env manager)
```

```shell
docker network create --driver=overlay web

STACK_NAME=hub docker stack deploy --compose-file ../buttpub/stacks/hub.yml hub
STACK_NAME=pub docker stack deploy --compose-file ../buttpub/stacks/pub.yml pub

PUB_NODE=$(docker service ps pub_peer-server --format "{{.Node}}")
alias pub_sbot="docker-machine ssh $(echo -n $PUB_NODE) docker run -i --rm --init -v pub_ssb:/home/node/.ssb --net pub_ssb -e ssb_host=pub_peer-server buttcloud/buttpub-peer-client"
pub_sbot whoami
```

## resources

- [Docker Get Started, Part 4: Swarms](https://docs.docker.com/get-started/part4/)
