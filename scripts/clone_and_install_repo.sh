#! /bin/bash
# This script is run automatically as a ``mup deploy``-hook
git clone --depth 1 --single-branch --branch="$BRANCH" https://github.com/bskp/rechords.git || git -C "rechords" pull
npm install --prefix rechords/showdown-rechords
npm install --prefix rechords/app
