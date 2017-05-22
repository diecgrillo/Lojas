# Lojas
Sites para lojas

oc login https://api.starter-us-east-1.openshift.com

oc lojas \
    -p MONGODB_USER=diecgrillo \
    -p MONGODB_PASSWORD=abcdef \
    -p MONGODB_DATABASE=lojas \
    -p MONGODB_ADMIN_PASSWORD=abcdef \
    mongodb:2.6
	

