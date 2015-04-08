# fluentd leaf server
# Version: 0.0.1
FROM fiacc/fluentdbase
MAINTAINER Fiacc o'Brien Moran "fiacc@users.noreply.github.com"

# add plugins
RUN gem install  --no-rdoc --no-ri fluent-plugin-grep

#http
EXPOSE 8888
#fluent
EXPOSE 24224

#copy in the fluent.conf
COPY fluent.conf /fluentd/fluent.conf 