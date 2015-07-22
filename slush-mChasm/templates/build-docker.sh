#!/bin/bash

echo "Simple script to rebuild your local docker base images"

docker build -f Dockerfile.base -t <%=chasmNameSlug%>-base .
docker build -f Dockerfile.dev -t <%=chasmNameSlug%>-base:dev .
