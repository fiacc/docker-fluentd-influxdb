## fluentd-aggregator docker image

### Installation

First [build the base fluentd image](../fluentd)

Build the fluentd-aggregator:

```bash
$ git clone https://github.com/fiacc/docker-fluentd-influxdb.git
$ cd fluentd-aggregator
$ sudo docker build -t="fiacc/fluentd-aggregator" .
```
### Usage
Make sure [influxdb container](../influxdb) is running 

####<a name="createsampledb">Create sample databases in influxdb
Corresponding to *match* rules in [fluent.conf](../fluentd-aggregator/fluent.conf)

```bash
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "performance_logs"}'
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "security_logs"}'
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "general_logs"}'
```

Start the primary aggregator.

```bash
docker run -d -h fluentdprimary --link influxdbprimary:influxdbprimary --name fluentdprimary fiacc/fluentd-aggregator
```
Start the secondary aggregator.

```bash
docker run -d -h fluentdsecondary --link influxdbprimary:influxdbprimary --name fluentdsecondary fiacc/fluentd-aggregator
```

### Next
Set up the [fluentd leaf](../fluentd-leaf) to start gathering some logs 


