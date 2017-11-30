#!/bin/bash

echo "First just echo the TRAVIS_TAG"
echo $TRAVIS_TAG
echo "Now, try the parameter modification"
echo ${TRAVIS_TAG#"v"}
echo "Complete"