# PerfSample

* On page load an ajax post is made to */perf* with the data from *window.performance.timing*.
* The express app logs the request to the fluentd-leaf server via a post to the in_http plugin
* fluentd-leaf forwards to fluentd-aggregator which does some processing and forwards to influxdb
* Records end up in series perf.*hostname*.timing in database performance_log
	
### Installation
```bash
git clone https://github.com/fiacc/docker-fluentd-influxdb.git
cd PerfSample
npm install
```

### Usage
```bash
node app.js
```

Browse to   and hit refresh a few times. 

Go to the influxdb web console to view the data (<a target="_blank" href="http://localhost:8083">http://localhost:8083</a>)

*This may take a few moments based on the flush_interval in the fluent.conf of the leaf and the aggregator*


See series in the db
```
list series
```
Select from the series..
```sql
select * from perf.localhost.timing
```

Query Syntax at <a target="_blank" href="http://influxdb.com/docs/v0.8/api/query_language.html">(Influxdb Query Language)</a>



