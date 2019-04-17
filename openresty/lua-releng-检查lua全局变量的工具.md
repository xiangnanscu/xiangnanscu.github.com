无意中发现openresty用`lua-releng`来检查lua文件中的全局变量情况(读和写). 还不错, 顺带发现春哥的`openresty-devel-utils`库.
如果提示luac没有安装,运行
```
apt-get install lua5.1
```
把这个文件下载到`/usr/bin`. 该脚本只支持一个文件, 因此需要结合find使用:
```
find . -name "*.lua" -exec perl /usr/bin/lua-releng {} \; 2>&1 | grep -E "SETG|(GETG)|(global)"
```
`2>&1` 意思是把标准错误输出重定向到标准输出。以便grep统一过滤和处理.

参考:
- https://github.com/openresty/openresty-devel-utils/blob/master/lua-releng
- https://segmentfault.com/a/1190000004297908

注释一些影响查看结果的语句
```
#!/usr/bin/env perl

use strict;
use warnings;

use Getopt::Std;

my (@luas, @tests);

my %opts;
getopts('Lse', \%opts) or die "Usage: lua-releng [-L] [-s] [-e] [files]\n";

my $silent = $opts{s};
my $stop_on_error = $opts{e};
my $no_long_line_check = $opts{L};

my $check_lua_ver = "luac -v | awk '{print\$2}'| grep 5.1";
my $output = `$check_lua_ver`;
if ($output eq '') {
    die "ERROR: lua-releng ONLY supports Lua 5.1!\n";
}

if ($#ARGV != -1) {
    @luas = @ARGV;

} else {
    @luas = map glob, qw{ *.lua lib/*.lua lib/*/*.lua lib/*/*/*.lua lib/*/*/*/*.lua lib/*/*/*/*/*.lua };
    if (-d 't') {
        @tests = map glob, qw{ t/*.t t/*/*.t t/*/*/*.t };
    }
}

for my $f (sort @luas) {
    process_file($f);
}

for my $t (@tests) {
    blank(qq{grep -H -n --color -E '\\--- ?(ONLY|LAST)' $t});
}
# p: prints a string to STDOUT appending \n
# w: prints a string to STDERR appending \n
# Both respect the $silent value
sub p { print "$_[0]\n" if (!$silent) }
sub w { warn  "$_[0]\n" if (!$silent) }

# blank: runs a command and looks at the output. If the output is not
# blank it is printed (and the program dies if stop_on_error is 1)
sub blank {
    my ($command) = @_;
    if ($stop_on_error) {
        my $output = `$command`;
        if ($output ne '') {
            die $output;
        }
    } else {
        system($command);
    }
}

my $version;
sub process_file {
    my $file = shift;
    # Check the sanity of each .lua file
    open my $in, $file or
        die "ERROR: Can't open $file for reading: $!\n";
    my $found_ver;
    while (<$in>) {
        my ($ver, $skipping);
        if (/(?x) (?:_VERSION|version) \s* = .*? ([\d\.]*\d+) (.*? SKIP)?/) {
            my $orig_ver = $ver = $1;
            $found_ver = 1;
            $skipping = $2;
            $ver =~ s{^(\d+)\.(\d{3})(\d{3})$}{join '.', int($1), int($2), int($3)}e;
            w("$file: $orig_ver ($ver)");
            last;

        } elsif (/(?x) (?:_VERSION|version) \s* = \s* ([a-zA-Z_]\S*)/) {
            w("$file: $1");
            $found_ver = 1;
            last;
        }

        if ($ver and $version and !$skipping) {
            if ($version ne $ver) {
                die "$file: $ver != $version\n";
            }
        } elsif ($ver and !$version) {
            $version = $ver;
        }
    }
    if (!$found_ver) {
        # w("WARNING: No \"_VERSION\" or \"version\" field found in `$file`.");
    }
    close $in;

    # p("Checking use of Lua global variables in file $file...");
    # p("\top no.\tline\tinstruction\targs\t; code");
    blank("luac -p -l $file | grep -E '[GS]ETGLOBAL' | grep -vE '\\<(require|type|tostring|error|ngx|ndk|jit|setmetatable|getmetatable|string|table|io|os|print|tonumber|math|pcall|xpcall|unpack|pairs|ipairs|assert|module|package|coroutine|[gs]etfenv|next|rawget|rawset|rawlen|select)\\>'");
    unless ($no_long_line_check) {
        p("Checking line length exceeding 80...");
        blank("grep -H -n -E --color '.{81}' $file");
    }
}

```
