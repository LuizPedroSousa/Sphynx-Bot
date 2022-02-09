#!/bin/sh

npm run typeorm migration:run

echo "Running project"
npm run dev:queue
