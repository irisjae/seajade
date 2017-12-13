#!/bin/bash    
HOST="vps8275.youdomain.hk"
USER="kodingkingdom"
PASS="PL@bb5qZ3m"
FTPURL="ftp://$USER:$PASS@$HOST"
LCD="/home/ubuntu/workspace/corals/perf"
RCD="/web/perf"
#DELETE="--delete"
lftp -c "set ftp:list-options -a;
open '$FTPURL';
lcd $LCD;
set cmd:fail-exit yes
cd $RCD;
mirror --reverse \
       $DELETE \
       --verbose"