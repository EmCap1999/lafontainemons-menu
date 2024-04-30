# La fontaine

A responsive website for a local restaurant.

## Server build

If an instance is running, execute:

```bash
docker compose stop && docker compose down
```

Next execute the following make rule:

```Makefile
make spin-new-infra
```

This is going to clear all docker volumes, containers, images and local DB data. It spins mount, spins up the instance and run checks.

Then run:

```bash
docker compose up
```

Last step needed, is to populate the database with the restaurant menu.

Enter the docker instance with:

```bash
docker exec -it <container_id> /bin/bash
```

Connect to the DB with the psql cli and execute the query.

