## fluentd-leaf docker image

### Installation

First [build the base fluentd image](../fluentd/README.md)

Build the fluentd-leaf:

```bash
$ git clone https://github.com/fiacc/docker-fluentd-influxdb.git
$ cd fluentd-leaf
$ sudo docker build -t="fiacc/fluentd-leaf" .
```

#### Prerequisites

* [influxdb](../influxdb) is running 
* [fluentd aggregator](../fluentd-aggregator) is running
* [sample databases are created](../fluentd-aggregator/#createsampledb)

Run the container, link to the primary and secondary aggregator's and bind port 8888
```bash
docker run -p 8888:8888 -t -i -h fluentdleaf1 --link fluentdprimary:fluentdprimary --link fluentdsecondary:fluentdsecondary --name fluentdleaf1 fiacc/fluentd-leaf
```
### Usage
Create some records via the HTTP source
```bash
curl -X POST 'http://localhost:8888/{tag}' -d'json={JSON Record}'
```

```bash
curl -X POST 'http://localhost:8888/perf.frontend1' -d'json={"action":"login","user":"fred","response_time":"498"}'
curl -X POST 'http://localhost:8888/perf.frontend1' -d'json={"action":"login","user":"fred","response_time":"500"}'
curl -X POST 'http://localhost:8888/perf.frontend1' -d'json={"action":"login","user":"fred","response_time":"300"}'
```
* fluentdleaf1 listens for HTTP messages on port 8888
* Forwards all logs to the aggregator fluentdprimary or fluentdsecondary,([fluent.conf](../fluentd-leaf/fluent.conf))
```ruby
<source>
  type http
  port 8888
  ...
</source>

<match **>
...
  <server>
    name fluentdprimary
    host fluentdprimary
    port 24224
    weight 60
  </server>
  <server>
    name fluentdsecondary
    host fluentdsecondary
    port 24224
    weight 60
  </server>
</match>
```
* [fluent.conf](../fluentd-aggregator/fluent.conf) on the aggregator decides what to do with each message based on the tag
* Tag perf.frontend1 matches rule perf.** so it is sent to influxdbprimary for storage in the performance_logs table

```ruby
<match perf.**>
  type influxdb
  dbname performance_logs
  flush_interval 10s # for testing.
  host influxdbprimary
  port 8086
</match>
```

Query the database for our logs (pretty=true for formatting)
```bash
 $ curl -G 'http://localhost:8086/db/performance_logs/series?u=root&p=root&pretty=true' --data-urlencode "q=select bottom(response_time,2) from perf.frontend1"
 ```
 gives
 
 ```json
 [
    {
        "name": "perf.frontend1",
        "columns": [
            "time",
            "bottom"
        ],
        "points": [
            [
                0,
                "10047"
            ],
            [
                0,
                "1022"
            ]
        ]
    }
]
 ```
 




