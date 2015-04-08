## fluentd base image
### Installation
Build the image:

```bash
$ git clone https://github.com/fiacc/docker-fluentd-influxdb.git
$ cd fluentd
$ sudo docker build -t="fiacc/fluentd" .
```

### Next
Set up the [fluentd aggregator](../fluentd-aggregator/README.md)
