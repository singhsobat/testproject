function myFunction() {
  var ss = SpreadsheetApp.openById("1ph9sA_wCkXBcfU4lLagLuvYibRNaSkiRpoYysAN6cF0"),
      sheet=ss.getSheets()[0],
      data = sheet.getDataRange().getValues(),
      rows= data.length,
      cols=data[0].length-1;
  
  var handouts = {};
  
  var dept = [];
  
  for(i=0;i<rows;i++){
    if(dept.indexOf(data[i][3])+1)
      continue;
    else
      dept.push(data[i][3]);
    
  }
  
  var courses = {};
  
  for(i=0;i<rows;i++)
  {
    
    var code = data[i][1];
    
    courses[code]={
      course_code : code,
      comp_code : data[i][0],
      course_name : data[i][2],
      };
     // i<324 bcz for last iteration i+1 is not defined
    if(i<324){
      if((data[i+1][3])===(data[i][3]))
        continue;
      
       else{
         handouts[data[i][3]] = courses;
         courses = {};
       }
    }  
      
  }   
  
  var firebaseurl = "https://handouts-database.firebaseio.com/";
  
  var base = FirebaseApp.getDatabaseByUrl(firebaseurl);
  base.setData("",handouts);
  
}

