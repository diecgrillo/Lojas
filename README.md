# Lojas
Sites para lojas

oc login https://api.starter-us-east-1.openshift.com

oc lojas -p MONGODB_USER=diecgrillo -p MONGODB_PASSWORD=abcdef -p MONGODB_DATABASE=licristy -p MONGODB_ADMIN_PASSWORD=abcdef 

$ oc new-app mongodb-persistent -p MONGODB_USER=admin -p MONGODB_PASSWORD=abcdef -p MONGODB_ADMIN_PASSWORD=abcdef

$ oc set env dc/lojas MONGO_URL='mongodb://admin:abcdef@172.30.12.11:27017/licristy'

sh-4.2$ mongorestore /var/lib/mongodb/dump/template/ --db licristy --username admin --password abcdef --authenticationDatabase admin

sh-4.2$ mongo admin -u admin -p abcdef