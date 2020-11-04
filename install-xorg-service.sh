#!/usr/bin/env bash
set -e

# install Xorg
apt-get install -y xserver-xorg-core

# Create xorg.conf
BUS_ID=$(nvidia-xconfig --query-gpu-info | grep BusID | awk '{print $4}')
echo "Nvidia bus id is $BUS_ID"
nvidia-xconfig --virtual=1920x1200 --busid "$BUS_ID"

# Create xorg service to keep it always running
cat > /usr/lib/systemd/system/xorg.service << EOF
[Unit]
Description=Xorg
After=network.target
Before=docker.service

[Service]
ExecStart=Xorg -noreset +extension GLX +extension RANDR +extension RENDER :99
Restart=always

[Install]
WantedBy=docker.service
EOF

systemctl daemon-reload
systemctl start xorg
systemctl enable xorg

echo "xorg service started and enabled, run 'systemctl status xorg' to see the status"
