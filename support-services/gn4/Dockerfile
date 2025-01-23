FROM alpine/git AS clone
WORKDIR /app
RUN git clone --recursive --depth=1 --shallow-submodules https://github.com/geonetwork/core-geonetwork.git
RUN git clone --recursive --depth=1 --shallow-submodules https://github.com/metadata101/dcat-ap.git


FROM maven:3.9-amazoncorretto-11 AS build

WORKDIR /app
COPY --from=clone /app/core-geonetwork /app
COPY --from=clone /app/dcat-ap /app/schemas/dcat-ap

# reference DCAT-AP plugin (see https://github.com/metadata101/dcat-ap)
RUN sed -i "s#</modules>#<module>dcat-ap</module></modules>#" \
    /app/schemas/pom.xml
RUN sed -i 's#</dependencies>#<dependency><groupId>org.geonetwork-opensource.schemas</groupId><artifactId>gn-schema-dcat-ap</artifactId><version>${project.version}</version></dependency></dependencies>#' \
    /app/web/pom.xml
RUN sed -i 's#</artifactItems>#<artifactItem><groupId>org.geonetwork-opensource.schemas</groupId><artifactId>gn-schema-dcat-ap</artifactId><type>zip</type><overWrite>false</overWrite><outputDirectory>${schema-plugins.dir}</outputDirectory></artifactItem></artifactItems>#' \
    /app/web/pom.xml

RUN mvn install -DskipTests


FROM jetty:9-jdk11

ENV DATA_DIR /catalogue-data
ENV WEBAPP_CONTEXT_PATH /geonetwork
ENV GN_CONFIG_PROPERTIES -Dgeonetwork.dir=${DATA_DIR} \
        -Dgeonetwork.formatter.dir=${DATA_DIR}/data/formatter \
        -Dgeonetwork.schema.dir=/opt/geonetwork/WEB-INF/data/config/schema_plugins \
        -Dgeonetwork.indexConfig.dir=/opt/geonetwork/WEB-INF/data/config/index

ENV JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true \
        -Xms512M -Xss512M -Xmx2G -XX:+UseConcMarkSweepGC

USER root
RUN apt-get -y update && \
    apt-get -y install --no-install-recommends \
        unzip && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p ${DATA_DIR} && \
    chown -R jetty:jetty ${DATA_DIR} && \
    mkdir -p /opt/geonetwork && \
    chown -R jetty:jetty /opt/geonetwork

USER jetty

COPY --from=build /app/web/target/geonetwork.war /opt/geonetwork/

RUN cd /opt/geonetwork/ && \
     unzip -q geonetwork.war && \
     rm geonetwork.war

COPY thesauri/place/* /opt/geonetwork/WEB-INF/data/config/codelist/external/thesauri/place/
COPY thesauri/theme/* /opt/geonetwork/WEB-INF/data/config/codelist/external/thesauri/theme/

COPY jetty/geonetwork_context_template.xml /usr/local/share/geonetwork/geonetwork_context_template.xml
COPY ./docker-entrypoint.sh /geonetwork-entrypoint.sh

RUN java -jar /usr/local/jetty/start.jar --create-startd --add-module=http-forwarded

ENTRYPOINT ["/geonetwork-entrypoint.sh"]
CMD ["java","-jar","/usr/local/jetty/start.jar"]

VOLUME [ "${DATA_DIR}" ]
