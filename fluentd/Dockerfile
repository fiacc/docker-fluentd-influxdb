# Base image for fluent logging
# Version: 0.0.1
FROM ubuntu:14.04
MAINTAINER Fiacc o'Brien Moran "fiacc@users.noreply.github.com"

#Update & Install ruby
RUN apt-get update && apt-get install -y ruby-dev make && rm -rf /var/lib/apt/lists/*

#Install fluentd
RUN gem install --no-rdoc --no-ri fluentd
RUN fluentd -s /fluentd

#copy in the fluent.conf
COPY fluent.conf /fluentd/fluent.conf 

ENTRYPOINT ["fluentd","-c"]
CMD ["/fluentd/fluent.conf"]
