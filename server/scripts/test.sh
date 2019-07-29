#!/usr/bin/env bash

pytest tests --cov=tests --cov-report=term-missing ${@}