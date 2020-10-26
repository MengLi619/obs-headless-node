FROM ubuntu:20.04

# Install obs dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y \
    libmbedtls-dev \
    libasound2-dev \
    libavcodec-dev \
    libavdevice-dev \
    libavfilter-dev \
    libavformat-dev \
    libavutil-dev \
    libcurl4-openssl-dev \
    libfdk-aac-dev \
    libfontconfig-dev \
    libfreetype6-dev \
    libgl1-mesa-dev \
    libjack-jackd2-dev \
    libjansson-dev \
    libluajit-5.1-dev \
    libpulse-dev \
    libqt5x11extras5-dev \
    libspeexdsp-dev \
    libswresample-dev \
    libswscale-dev \
    libudev-dev \
    libv4l-dev \
    libvlc-dev \
    libx11-dev \
    libx264-dev \
    libxcb-shm0-dev \
    libxcb-xinerama0-dev \
    libxcomposite-dev \
    libxinerama-dev \
    pkg-config \
    python3-dev \
    qtbase5-dev \
    libqt5svg5-dev \
    swig \
    libxcb-randr0-dev \
    libxcb-xfixes0-dev \
    libx11-xcb-dev \
    libxcb1-dev \
    protobuf-compiler-grpc \
    x11vnc \
    libnvidia-encode-450 \
    xserver-xorg-video-dummy \
    xserver-xorg-input-void

# Setting local time
RUN apt-get install -y tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo Asia/Shanghai > /etc/timezone

# Node
RUN apt-get install -y nodejs npm

# Git
RUN apt-get install -y git

# Xorg
COPY xorg.conf /etc/xorg.conf
ENV DISPLAY :99

# Copy code
WORKDIR /node-app
COPY package.json package-lock.json tsconfig.json ./
COPY src src

# Install dependencies
RUN npm i -g typescript
RUN npm config set unsafe-perm true && \
    npm ci && \
    npm config set unsafe-perm false

# Build
RUN npm run build

ADD entrypoint.sh ./

ENTRYPOINT ["sh", "entrypoint.sh"]
CMD [ "npm", "start" ]
