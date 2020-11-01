#!/usr/bin/env bash

if [[ -z "$NVIDIA_VISIBLE_DEVICES" ]]; then
  Xorg -noreset +extension GLX +extension RANDR +extension RENDER -config /etc/xorg.conf $DISPLAY &
fi

exec "$@"
