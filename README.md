## Overview

This project uses [obs-studio](https://github.com/obsproject/obs-studio) to switch input streams in the backend.
Use [obs-node](https://github.com/MengLi619/obs-node) as the node wrapper of obs-studio.

## Run project locally
```shell script
npm run build && npm start
```

## GPU (Nvidia) docker installation
1. Install nvidia-docker
    ```shell script
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
    curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
    curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    sudo apt-get update    
    sudo apt-get install -y nvidia-docker2
    sudo systemctl restart docker
    ```
2. Run docker with nvidia-runtime
    ```shell script
    docker run --rm --gpus all -p 8080:8080 -v "$(pwd)/config.json":/node-app/dist/resource/config.json registry.cn-beijing.aliyuncs.com/mengli/obs-headless-node:latest
    ```
    

