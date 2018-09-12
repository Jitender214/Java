/**
 * 
 */
    
  function getDepts(locId){
    $.ajax({
      url : "/api/v1/location/"+locId+"/department",
      type : "GET",
      success : function(response) {
        if (response != null) {
          $("#deptsTable tbody").html("");
          var content = "";
          if(response.length == 0) {
            content="<span class='label label-default label-md'>No records found</span>"
          } else {
            $.each(response, function(key, value) {
              content += "<tr><td>Department</td><td>"+value.deptName+"</td><td><button type='button' onclick='getCategories("
              +locId+","+value.deptId+")' id="+value.deptId+" class='btn btn-success btn-sm loadDeptBtn'>Categories <span class='glyphicon glyphicon-plus'></span></button></td><td><button type='button' onclick='deleteRecord("
              +locId+","+value.deptId+")' id="+value.deptId+" class='btn btn-danger btn-sm delRecord'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
            });
          }
          $("#deptsOfLoc").val(locId);
          $("#deptsTable tbody").append(content);
          $(".deptsDiv").show();
        } 
      }
    });
  }
  function getCategories(locId, deptId){
    $.ajax({
      url : "/api/v1/location/"+locId+"/department/"+deptId+"/category",
      type : "GET",
      success : function(response) {
        if (response != null) {
          $("#catgsTable tbody").html("");
          var content = "";
          if(response.length == 0) {
            content="<span class='label label-default label-md'>No records found</span>"
          } else {
            $.each(response, function(key, value) {
              content += "<tr><td>Category</td><td>"+value.catName+"</td><td><button type='button' onclick='getSubCategories("
              +locId+","+deptId+","+value.catId+")' id="+value.catId+" class='btn btn-success btn-sm loadDeptBtn'>Sub Categories <span class='glyphicon glyphicon-plus'></span></button></td><td><button type='button' onclick='deleteRecord("
              +locId+","+deptId+","+value.catId+")' id="+value.catId+" class='btn btn-danger btn-sm delRecord'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
            });
          }
          $("#catgsOfDept").val(deptId);
          $("#catgsTable tbody").append(content);
          $(".catgsDiv").show();
        } 
      }
    });
  }
  function getSubCategories(locId, deptId, catId){
    $.ajax({
      url : "/api/v1/location/"+locId+"/department/"+deptId+"/category/"+catId+"/subcategory",
      type : "GET",
      success : function(response) {
        if (response != null) {
          $("#subCatgsTable tbody").html("");
          var content = "";
          if(response.length == 0) {
            content="<span class='label label-default label-md'>No records found</span>"
          } else {
            $.each(response, function(key, value) {
              content += "<tr><td>Sub Category</td><td>"+value.subCatName+"</td><td><button type='button' onclick='deleteRecord("
              +locId+","+deptId+","+catId+","+value.subCatId+")' id="+value.subCatId+" class='btn btn-danger btn-sm delRecord'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
            });
          }
          $("#subCatgsOfCatgs").val(catId);
          $("#subCatgsTable tbody").append(content);
          $(".subCatgsDiv").show();
        } 
      }
    });
  }
  function deleteRecord(locId, deptId, catId, subCatId) {
    if(subCatId != undefined) {
      urlString = "/api/v1/location/"+locId+"/department/"+deptId+"/category/"+catId+"/subcategory/"+subCatId;
    } else if (catId != undefined ){
      urlString = "/api/v1/location/"+locId+"/department/"+deptId+"/category/"+catId;
    } else if (deptId != undefined) {
      urlString = "/api/v1/location/"+locId+"/department/"+deptId;
    } else if (locId != undefined) {
      urlString = "/api/v1/location/"+locId;
    }
    $.ajax({
      url : urlString,
      type : "DELETE",
      success : function(response) {
        if(response == 1) {
          $("#alert-header").parent().attr('class', 'alert alert-success');
          $("#alert-header").text("Success");
          $("#alert-message").text("Record deleted sucessfully.");
          $("#alert-modal").modal('show');
        } else {
          $("#alert-header").parent().attr('class', 'alert  alert-danger');
          $("#alert-header").text("Failed");
          $("#alert-message").text("Record not deleted. Unique contraint error.");
          $("#alert-modal").modal('show');
        }
      },
      error : function(error) {
        $("#alert-header").parent().attr('class', 'alert  alert-danger');
        $("#alert-header").text("Failed");
        $("#alert-message").text("OOPS... Something went wrong");
        $("#alert-modal").modal('show');
      }
    });
  }
  
  function initTree(treeData) {
    $('#treeview_json').treeview({data: treeData});
  }

    var apiEntityNames = {
      "Location" : "locName",
      "Department" : "deptName",
      "Category" : "catName",
      "SubCategory" : "subCatName"
    }
  
  $(document).ready(function() {
    $(".treeDiv").hide();
    $(".storesDiv").hide();
    $(".deptsDiv").hide();
    $(".catgsDiv").hide();
    $(".subCatgsDiv").hide();
    $(".alertClose").click(function() {
    	$('#alert-modal').modal('hide');
    	$('.modal-backdrop').remove();
    });

    $(".addEntityModalBtn").click(function() {
      var title = this.textContent.trim();
      var entity = title.split(" ")[1];
      $("#modalEntityTitle").text(title);

      // entityName and entityValue for request
      $.each(apiEntityNames, function(key,value) {
        if(entity == key) {
          $("#entityName").attr("name", value);
        }
      });
    });

    $("#launchStores").click(function() {
      var sotresMode = $(".storesDiv").is(":visible");
      if(sotresMode) {
        $(".storesDiv").hide();
      } else {
        $.ajax({
          url : "/api/v1/location",
          method : "GET",
          success : function(response) {
            if (response != null) {
              $("#storesTable tbody").html("");
              var content = "";
              $.each(response, function(key, value) {
                content += "<tr><td>Location</td><td>"+value.locName+"</td><td><button type='button' onclick='getDepts("
                +value.locId+")' id="+value.locIid+" class='btn btn-success btn-sm loadDeptBtn'>Departments <span class='glyphicon glyphicon-plus'></span></button></td><td><button type='button' onclick='deleteRecord("
                +value.locId+")' id="+value.locIid+" class='btn btn-danger btn-sm delRecord'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
              });
              $("#storesTable tbody").append(content);
            } 
          }
        });
        $(".storesDiv").show();
      }
    });

    $("#lnchstoresTree").click(function() {
       var mode = $("#treeview_json").is(":visible");
       if(mode) {
        $(".treeDiv").hide();
       } else {
        $.ajax({
          url : "/api/v1/location",
          success : function(response) {
            if (response != null) {
              $.each(response, function(key, value) {
                response = JSON.parse(JSON.stringify(response).split('"locName":').join('"text":'));
                response = JSON.parse(JSON.stringify(response).split('"deptName":').join('"text":'));
                response = JSON.parse(JSON.stringify(response).split('"catName":').join('"text":'));
                response = JSON.parse(JSON.stringify(response).split('"subCatName":').join('"text":'));
                response = JSON.parse(JSON.stringify(response).split('"departments":').join('"nodes":'));
                response = JSON.parse(JSON.stringify(response).split('"categories":').join('"nodes":'));
                response = JSON.parse(JSON.stringify(response).split('"subCategories":').join('"nodes":'));
              });
              initTree(response);
              $(".treeDiv").show();
            }
          }
        }); 
       }
    });
    
    $("#addEntityForm").submit(function(e) {

      var locationId = $("#deptsOfLoc").val();
      var deptartmentId = $("#catgsOfDept").val();
      var categoryId = $("#subCatgsOfCatgs").val();
      if(categoryId != undefined && categoryId != "") {
        urlString = "http://localhost:8080/api/v1/location/"+locationId+"/department/"+deptartmentId+"/category/"+categoryId+"/subcategory/";
      } else if (deptartmentId != undefined && deptartmentId != "" ){
        urlString = "http://localhost:8080/api/v1/location/"+locationId+"/department/"+deptartmentId+"/category/";
      } else if (locationId != undefined && locationId != "") {
        urlString = "http://localhost:8080/api/v1/location/"+locationId+"/department/";
      } else {
        urlString = "http://localhost:8080/api/v1/location/";
      }
      var entitykey = $("#entityName").attr("name");
      var entityval = $("#entityName").val();
      var entity ={};
      entity[entitykey] = entityval;
      
      var jsonData = JSON.stringify(entity);
      
      //if(title != "" && name != "" && phone != "" && ext != "" && fax != "" && email != "") {
          $.ajax({
               type: "POST",
               url: urlString,
               data: jsonData,
               contentType: 'application/json; charset=utf-8',
               dataType: 'json',
               success: function(data)
               {
                $('#addEntityModal').modal('hide');
                $("#alert-header").parent().attr('class', 'alert alert-success');
                $("#alert-header").text("Success");
                $("#alert-message").text("Record Added sucessfully.");
                $("#alert-modal").modal('show');
               },
               error: function(data)
               {
                $('#addEntityModal').modal('hide');
                $("#alert-header").parent().attr('class', 'alert  alert-danger');
                $("#alert-header").text("Failed");
                $("#alert-message").text("OOPS... Something went wrong");
                $("#alert-modal").modal('show');
               }
             });
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
    
  });
