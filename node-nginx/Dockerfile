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


# In order to drop the root user, we have to make some directories world
# writeable as OpenShift default security model is to run the container under
# random UID.
RUN chmod -R a+rwx /etc && \
    chmod -R a+rwx /var/log/nginx && \
    chmod -R a+rwx /var/lib/nginx && \
    chmod -R a+rwx /run
    # chown -R 1001:0 ${NGINX_APP_ROOT} && \
    # chown -R 1001:0 /var/opt/rh/rh-nginx18 && \
    # chown -R 1001:0 ${NGINX_CONTAINER_SCRIPTS_PATH}/nginx-start && \
    # rpm-file-permissions
CMD ["/bin/bash"]
