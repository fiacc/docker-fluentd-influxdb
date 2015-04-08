# influxdb container
# Version: 0.0.1
FROM ubuntu:14.04
MAINTAINER Fiacc o'Brien Moran "fiacc@users.noreply.github.com"

# Update & install wget
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

#Get and install influxdb
ENV INFLUX_VER 0.8.8
ENV INFLUX_DEB influxdb_${INFLUX_VER}_amd64.deb
RUN wget http://s3.amazonaws.com/influxdb/${INFLUX_DEB} && dpkg -i ${INFLUX_DEB} && rm ${INFLUX_DEB}


# Admin web interface
EXPOSE 8083
# HTTPS API, set port & cert in config.toml
EXPOSE 8084
# HTTP API
EXPOSE 8086

#Raft Port
#EXPOSE 8090
#Protobuf Port
#EXPOSE 8099

RUN mkdir /config
COPY config.toml /config/config.toml

#Mount the data volume
VOLUME ["/data"]

ENTRYPOINT ["/opt/influxdb/current/influxdb","-config"]
CMD ["/config/config.toml"]

