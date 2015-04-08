## influxdb docker image

### Installation
Build the image:

```bash
$ git clone https://github.com/fiacc/docker-fluentd-influxdb.git
$ cd influxdb
$ sudo docker build -t="fiacc/influxdb" .
```
### Usage
Start the container. 

*(Map ports, 8086 for HTTP API,8084 for HTTPS API & 8083 for the admin console, only needed for external testing.)*

Set the hostname so the fluentd server can find it. *(assumes using docker --link,be aware that the fluent-plugin-influxdb output plugin doesn't like hyphens in hostnames*)

```bash
$ sudo docker run -p 8086:8086 -p 8083:8083 -d -h influxdbprimary --name influxdbprimary fiacc/influxdb
```

### Test
Create a test db
```bash
$ curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "test_db"}'
```
add some data
```bash
$ curl -X POST 'http://localhost:8086/db/test/series?u=root&p=root' -d '[{"name":"foo","columns":["val"],"points":[[23]]}]' 
```
query the data
```bash
$ curl -G 'http://localhost:8086/db/test/series?u=root&p=root&pretty=true' --data-urlencode "q=select * from foo"
```
drop the db
```bash
$ curl -X DELETE 'http://localhost:8086/db/test?u=root&p=root'
```

### Next
Build the [fluentd base image](../fluentd)
