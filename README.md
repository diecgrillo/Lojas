# Lojas
Sites para lojas

oc login https://api.starter-us-east-1.openshift.com

oc lojas \
    -e MONGODB_USER=diecgrillo \
    -e MONGODB_PASSWORD=abcdef \
    -e MONGODB_DATABASE=lojas \
    -e MONGODB_ADMIN_PASSWORD=abcdef \
    mongodb:2.6
