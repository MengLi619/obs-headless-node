FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Obs dependencies
RUN apt-get update && \
    apt-get install -y \
    libmbedtls12 \
    libasound2 \
    libavcodec58 \
    libavdevice58 \
    libavfilter7 \
    libavformat58 \
    libavutil56 \
    libcurl4 \
    openssl \
    libfdk-aac1 \
    libfontconfig1 \
    libfreetype6 \
    libgl1-mesa-glx \
    libjack-jackd2-0 \
    libjansson4 \
    libluajit-5.1-2 \
    libpulse0 \
    libqt5x11extras5 \
    libspeexdsp1 \
    libswresample3 \
    libswscale5 \
    libudev1 \
    libv4l-0 \
    libvlc5 \
    libx11-6  \
    libx264-155 \
    libxcb-shm0 \
    libxcb-xinerama0 \
    libxcomposite1 \
    libxinerama1 \
    pkg-config \
    python3 \
    libqt5core5a \
    libqt5svg5 \
    swig \
    libxcb-randr0 \
    libxcb-xfixes0 \
    libx11-xcb1 \
    libxcb1 \
    libsrt1

# Setting local time
RUN apt-get install -y tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo Asia/Shanghai > /etc/timezone

# Git, Node
RUN apt-get install -y git nodejs npm

# Xorg dummy input/driver
RUN apt-get install -y xserver-xorg-input-void xserver-xorg-video-dummy
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

ENTRYPOINT ["bash", "entrypoint.sh"]
CMD [ "npm", "start" ]
