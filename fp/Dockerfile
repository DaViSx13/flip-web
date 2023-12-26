FROM php:5.5-apache

RUN DEBIAN_FRONTEND=noninteractive

COPY ./php/config/apt/sources.list /etc/apt/sources.list

RUN ln -s /usr/lib/x86_64-linux-gnu/libsybdb.a /usr/lib/

RUN apt-get -o Acquire::Check-Valid-Until=false update
RUN apt-get install -y --force-yes\
        freetds-bin \
        freetds-dev \
        freetds-common \
        tdsodbc \
    && docker-php-ext-install mssql

RUN service apache2 restart

COPY ./php/config/freetds/freetds.conf /etc/freetds/


