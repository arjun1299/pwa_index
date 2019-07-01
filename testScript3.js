createDB();

var btnSubmit=document.getElementById("submit");
btnSubmit.addEventListener('click',addElement)

var btnView=document.getElementById('view');
btnView.addEventListener('click',readElement);

var btnPop=document.getElementById('pop');
btnPop.addEventListener('click',popElement);

var btntrans=document.getElementById('transfer');
btntrans.addEventListener('click',chkOnline);

var btnPressChk=-1;

function dispMsg()
{
    var name=document.getElementById("name");
    name=name.value;

    alert(name)

    //createDB()    
}

//global database variable
var db=null;
var f1=null;
//////////////


function chkOnline()
{
    /*var tx=db.transaction("test_table","readwrite");
    var tab=tx.objectStore('test_table');
    var count_req=tab.count();
    var num;
    count_req.onsuccess=e=>{
        num=count_req.result;
        console.log(num);*/

        //only after the transaction is complete the value of num is non zero , hence we have to put the whole transfer process in the call back of this funct.
        if(navigator.onLine)
        {
            
            //for(var i=num;i>0;i--)
            {
                console.log('online')
            
                transferElement();
            }
            
        }
    
        else
        {
            console.log('offline')
        }
    

    }
    




function addElement()
{
    var tx=db.transaction("test_table","readwrite");
    var tab=tx.objectStore('test_table');
    f1=document.getElementById("name")
    f1=f1.value;

    var f2=document.getElementById("age").value;

    const obj={
        name:f1,
        age :f2,
    
    };

    tab.add(obj);
    btnPressChk=-1;

    
}


function createDB()
{
    var req=indexedDB.open("testDB",1);

    req.onsuccess=(a)=>{
        //console.log("sucess")
        //console.log(a.target)
        db=a.target.result
        

    }

    req.onupgradeneeded=function(u)
    {
        console.log('upgraded');
        db=u.target.result
        var tab=db.createObjectStore('test_table',{keyPath:"name"});
        
        //tab.createIndex('name','name',{uniqe:true});
        

        
        
    }

    req.onerror=function(e)
    {
        console.log('error:'+e.target.error);
        
    }

    
    
}



function readElement() {

    
    btnPressChk++;
        if (btnPressChk<=0)
        {
        var table=document.getElementById('tab');
        const tx = db.transaction("test_table","readonly")
        const objStore = tx.objectStore("test_table")
        const request = objStore.openCursor()
        request.onsuccess = e => {
            const cursor = e.target.result
            if (cursor) {
                var name=cursor.key;
                var age=cursor.value.age;
                var row=tab.insertRow(0);//tr element
                var cell1=row.insertCell(0);//td element    
                var cell2=row.insertCell(1);//td element                                            

                    
                cell1.innerHTML=name;
                cell2.innerHTML=age;



                //do something with the cursor
                cursor.continue()
            }
        }
    }
}

function popElement()
{

    
    const tx = db.transaction("test_table","readwrite")
    const ptab = tx.objectStore("test_table")
    const request = ptab.openCursor()
    request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {
            var name=cursor.key;
            var age=cursor.value.age;
            
            ptab.delete(name);
            alert('deleted!!')

            //do something with the cursor
            
        }
    }

}




async function transferElement()
{
    console.log('called')
    const tx = db.transaction("test_table","readwrite")
    const ptab = tx.objectStore("test_table")
    const request = ptab.openCursor()
    var xhttp=new XMLHttpRequest();


    request.onsuccess = function(e){
        const cursor = e.target.result
        
        
            if (cursor) 
            {
                //do something with the cursor
                var name=cursor.value.name;

                

                xhttp.onreadystatechange=function()
                {
                    if(this.status==200 && this.readyState==4)
                        {console.log(this.responseText);
                        alert('Sent to server!');
                        if(xhttp.responseText=='done')
                            {   
                                popElement();
                                document.getElementById('transfer').click();
                                
                            }
                        
                    }
                    else 
                        console.log(`Status:${this.status} Ready state:${this.readyState}`);
                    }
                    
                    var json=JSON.stringify(cursor.value);
                    //console.log(cursor);
                    console.log(json);
                    xhttp.open("POST",'http://10.36.243.202/flask/display',true);
                    console.log('Sending'+json);
                    xhttp.send(json);

                    console.log('Recieved'+ xhttp.responseText);
                    


                    
                
            }
        }   

    

    /*request.onerror= e =>{
        console.log('Error:'+e.target.error)
    }*/

}


function py_test()
{
    var xhttp=new XMLHttpRequest();


    xhttp.onreadystatechange=function()
    {
        if(this.status==200 && this.readyState==4)
            alert('Sent to server!');
        else 
            alert(`Status:${this.status} Ready state:${this.readyState}`);
    }


    xhttp.open("GET",'http://127.0.0.1/flask/test',true);
    xhttp.send();


}

