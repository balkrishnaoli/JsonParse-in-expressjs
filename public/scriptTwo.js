/**
 *  ajax method in generic javascript
 */
function ajax(url, method, data, callback){
var request = new XMLHttpRequest();
request.open(method, url, true);

    request.onload = function() {
       if (request.status >= 200 && request.status < 400) {
           var contentType = request.getResponseHeader('content-type') || '';
           var response;
           if (contentType.indexOf('json') >= 0){
               response = JSON.parse(request.responseText);
           }
           else{
               response = request.responseText;
           }
           callback(response);
       }
    };
    if (data){
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(data);
    }
    else {
        request.send();
    }
}


//getting json from item.json annd finding path
ajax('/itemJson', 'GET', null,function(response) {
   document.getElementById("path").innerHTML = find('item2', response);
});

//getting json from main.json
ajax('/mainJson', 'GET', null,function(response) {
    document.getElementById("jsonBeforeUpdate").innerHTML = JSON.stringify(response);

});
//getting updated json file from main.json
ajax('/updateJson', 'GET', null,function(response) {
     document.getElementById("jsonAfterUpdate").innerHTML = JSON.stringify(response);
 });

//getting element value
ajax('/elementJson', 'GET', null,function(response) {
    document.getElementById("elementValue").innerHTML =
     findValue("itemList.items.subItems","label","subItem1Item2",response);
});




// getting path of a element
function find(val, data){
  var search = function(path, searchObj){
    var found = null;

    for(var key in searchObj ){
      var rVal = searchObj[key];
      // object
      if(typeof rVal === 'object') {
        if(isNaN(key))
          found = search(path + '\\' + key, rVal);
        else {
            found = search(path + '[' + key + ']', rVal);
        }
        if(found) break; // Break out of loop if found
      }
      else if(rVal === val){
        if(isNaN(key))
          found = path + '\\' + key ;
        else {
            found = path + '[' + key+ ']';
        }
      }
    }
    return found;
  }
  return search('Path: ', data);
}

//getting value of element
function findValue(path,element, identity, searchObj){
    console.log(eval("searchObj."+path+"["+2+"].id"));
    var value;
    for(var i=0; i<path.length;i++){
      if(eval("searchObj."+path+"["+i+"].id")==identity){
        value = eval("searchObj."+path+"["+i+"]."+element);
        console.log(eval("searchObj."+path+"["+i+"]."+element));
        break;
      }
        value = eval("searchObj."+path+"["+2+"]."+element);
    }
    return value;
  }
