所谓本地化, 是指你的应用涉及到的日期设定, 判断和展示都是同一个时区的. 那么就应该使用`timestamp(0) with time zone`. 为什么? 因为`epoch from`这玩意在转换诸如`2017-07-16 12:59:00`这类日期字符串为秒数时,如果没有发现时区信息, 那么它会把这个时间认为是UTC的.
在你的程序中就没法直接用这个秒数来判断和当前秒数比较.

```shell
jarsj=# update config set bmjssj='2017-07-16 04:44:34';                                                                                                 
UPDATE 2
jarsj=# select cast(extract(epoch from bmjssj) as integer) from config;
 date_part  
------------
 1500180274
 1500180274
(2 rows)

jarsj=# alter table config alter column bmjssj type timestamp(0) with time zone;
ALTER TABLE
jarsj=# select cast(extract(epoch from bmjssj) as integer) from config;                                                                                 
 date_part  
------------
 1500151474
 1500151474
(2 rows)

jarsj=# select bmjssj from config;
         bmjssj         
------------------------
 2017-07-16 04:44:34+08
 2017-07-16 04:44:34+08
(2 rows)

jarsj=# update config set bmjssj='2017-07-16 04:44:34';                                                                                                 
UPDATE 2
jarsj=# select bmjssj from config;                                                                                                                      
         bmjssj         
------------------------
 2017-07-16 04:44:34+08
 2017-07-16 04:44:34+08
(2 rows)
```
