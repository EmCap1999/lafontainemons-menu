echo "stopping & shutting down instances";
docker-compose stop && docker-compose down;

echo "stopping & shutting down instances";
docker system prune -f -a && sudo rm -rf ~/apps/postgres;

echo "Pulling last modification";
git pull;

echo "Building fresh containers";
docker-compose -f compose.yaml build;
docker-compose -f compose.yaml up --detach;
docker-compose -f compose.yaml stop && docker-compose -f compose.yaml down;
docker-compose -f compose.yaml up --detach;

echo "Executing the SQL statement"
POSTGRES_CONTAINER=$(docker container ls  | grep 'postgres' | awk '{print $1}');
echo "postgre database container process found: ${POSTGRES_CONTAINER}"
cat database/db_request.sql | docker exec -i $POSTGRES_CONTAINER psql -U lafontaine -d lafontaine
