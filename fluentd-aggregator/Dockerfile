# fluentd aggregator with storage in influxdb
# Version: 0.0.1
FROM fiacc/fluentdbase
MAINTAINER Fiacc o'Brien Moran "fiacc@users.noreply.github.com"

# fluentd plugins & dependencies
RUN gem install  --no-rdoc --no-ri influxdb
RUN gem install  --no-rdoc --no-ri fluent-plugin-influxdb
RUN gem install  --no-rdoc --no-ri fluent-plugin-grep

#forward port
EXPOSE 24224

#copy in the fluent.conf
COPY fluent.conf /fluentd/fluent.conf 

