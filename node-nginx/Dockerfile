FROM openshift/base-centos7

RUN yum install -y wget;  \
    wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo; \
    yum clean all; \
    rm -rf /var/cache/yum;  \
    yum makecache;   \
    yum install -y epel-release.noarch; \
    yum install -y nodejs; \
    yum install nginx -y; \
    yum install -y openssl ; \
    yum clean all;   \
    rm -rf /var/cache/yum;


CMD ["/bin/bash"]
