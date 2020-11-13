#!/bin/bash

npm start &

npm start --prefix ./../micro-frontends/navbar &

npm start --prefix ./../micro-frontends/annotations &

npm start --prefix ./../micro-frontends/trainings &

npm start --prefix ./../micro-frontends/material-ui
