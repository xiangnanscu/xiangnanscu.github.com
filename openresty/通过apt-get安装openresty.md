```
   10  wget -qO - https://openresty.org/package/pubkey.gpg | sudo apt-key add -
   11  sudo apt-get -y install software-properties-common
   12  sudo add-apt-repository -y "deb http://openresty.org/package/ubuntu $(lsb_release -sc) main"
   13  add-apt-repository -y "deb http://openresty.org/package/ubuntu $(lsb_release -sc) main"
   14  sudo apt-get update
   15  sudo apt-get install openresty
```
参考:
- https://openresty.org/cn/linux-packages.html
