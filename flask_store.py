from flask import Flask,request
import requests
import cassandra
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider

app=Flask(__name__)


@app.route('/test',methods=['GET'])
def hello():
    return '<h1> Yes it works</h1>'

@app.route('/display',methods=['POST','GET'])
def display():
    print (request)
    #if(request.method == 'POST'):  
    if(1):
            req_data=request.get_data()
            #name=req_data['name']
            req_data=req_data.decode()
            cqlWrite(req_data)
            return 'done'
            
    else:
        return 'fail'



def cqlWrite(dataJson):
    credential=PlainTextAuthProvider(username = 'cassandra', password = 'cassandra')
    cluster = Cluster(auth_provider = credential)
    session = cluster.connect()
    #sample is the keyspace i want to connect to
    session.execute('USE cbr_test')
    session.execute("""INSERT INTO indexeddbtest JSON '{}'
   """.format(dataJson))


if (__name__=='main'):
    app.run()

