## Overview

This project uses [obs-studio](https://github.com/obsproject/obs-studio) to switch input streams in the backend.
Use [obs-node](https://github.com/MengLi619/obs-node) as the node wrapper of obs-studio.

## Run locally
```shell script
npm run build && npm start
```

## Run in docker
1. Create config.json
    ```shell script
    wget https://raw.githubusercontent.com/MengLi619/obs-headless-node/master/src/resource/config.json
    ```
2. Edit config.json with real environment
3. Run in docker
    ```shell script
    docker run \
      --name obs-headless-node \
      -d \
      --rm \ 
      -p 8080:8080 \
      -v "$(pwd)/config.json":/node-app/dist/resource/config.json \
      registry.cn-beijing.aliyuncs.com/mengli/obs-headless-node:latest
    ```

## Hardware (Nvidia GPU) accelerate installation
**Note:** We only test the GPU version in ubuntu 20.04 and cuda 11.1, and only one GPU in one machine.
Other environment should also work with some small change, but we never test it. 
1. Install cuda driver    
https://developer.nvidia.com/cuda-downloads
2. Install docker    
https://docs.docker.com/engine/install/ubuntu
3. Install nvidia-docker2
    ```shell script
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
    curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
    curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    sudo apt-get update    
    sudo apt-get install -y nvidia-docker2
    sudo systemctl restart docker
    ```
4. Install xorg service, which will run the Xorg from host to support GPU accessibility.
    ```shell script
    wget https://raw.githubusercontent.com/MengLi619/obs-headless-node/master/install-xorg-service.sh
    bash install-xorg-service.sh
    ```
5. Run docker with nvidia runtime
    ```shell script
    docker run -it \
        --name obs-headless-node \
        --privileged \
        --runtime nvidia \
        --rm \
        -p 8080:8080 \
        -e DISPLAY=:99 \
        -v /tmp/.X11-unix:/tmp/.X11-unix \
        -v "$(pwd)/config.json":/node-app/dist/resource/config.json \
        registry.cn-beijing.aliyuncs.com/mengli/obs-headless-node:latest-gpu
    ```
    

