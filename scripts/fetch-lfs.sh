#!/bin/bash
# scripts/fetch-lfs.sh

echo "Fetching Git LFS files..."
apt-get update && apt-get install -y git-lfs
git lfs install
git lfs pull
chmod +x scripts/fetch-lfs.sh
