var $$ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: '160419118_VensRecipe', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  navbar: {
    mdCenterTitle: true
  },
  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.capacitor,
    scrollIntoViewCentered: device.capacitor,
  },
  // Capacitor Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.capacitor) {
        // Init capacitor APIs (see capacitor-app.js)
        capacitorApp.init(f7);
      }
    },
  },
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

// var page = $$('.page[data-name="home"]')[0].f7Page;
// if (page.name == "home") {
//   app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {},
//     function (data) {
//       var arr = JSON.parse(data);
//       recipe_api = arr['data'];
//       recipe_api.forEach((t, index) => {
//         $$("#list-categories").append(`
//         <div class='col-50'>
//       <div class="card demo-card-header-pic">
//         <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/${t.image})"
//           class="card-header align-items-flex-end text-color-black justify-content-center">${t.nama_category}</div>
//         <div class="card-content card-content-padding">
//           <p>${t.description_category}</p>
//         </div>
//         <div class="card-footer"><a href="/recipecategory/${t.idcategory}" class="link">Read more</a></div>
//       </div>
//       </div>
//       `);
//       })
//     });
// }


$$(document).on('page:afterin', function (e, page) {
  if (!localStorage.username) {
    page.router.navigate('/login/');
  } else {
    username = localStorage.username;
  }
});


$$(document).on('page:init', function (e, page) {
  if (page.name == "login") {
    localStorage.removeItem("username");
    app.calendar.create({
      inputEl: '#tx_datebirth',
      closeOnSelect: true,
      dateFormat: "yyyy-mm-dd"
    });
    $$('#btnsignin').on('click', function () {

      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/login.php", {
        "username": $$("#username").val(),
        "password": $$("#password").val()
      }, function (data) {
        var arr = JSON.parse(data);
        var result = arr['result'];
        if (result == 'success') {
          localStorage.username = $$("#username").val();
          page.router.back("/");
          app.dialog.alert("Login Berhasil", "Information");
        } else {
          app.dialog.alert("Username Atau Password Salah", "Information");
        }
      });
    });

    
    $$('#btnsignup').on('click', function () {

      app.request.post('http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/register.php', {
          "username": $$("#txtusername").val(),
          "password": $$("#txtpassword").val(),
          "nama": $$("#txtname").val(),
          "tanggal_lahir": $$("#tx_datebirth").val()
        },
        function (data) {
          console.log($$("#txtusername").val());
          console.log($$("#txtpassword").val());
          console.log($$("#txtname").val());
          console.log($$("#tx_datebirth").val());
          var arr = JSON.parse(data);
          var result = arr['result'];
          if (result == 'success') {
            app.dialog.alert('Registration Success', 'Information');
            app.popup.close('.my-popup');
          } else {
            app.dialog.alert('Gagal menambah data');
          }
        });
    });
  }

  if (page.name == "home") {
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {},
      function (data) {
        var arr = JSON.parse(data);
        recipe_api = arr['data'];
        recipe_api.forEach((t, index) => {
          $$("#list-categories").append(`
        <div class='col-50'>
      <div class="card demo-card-header-pic">
        <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/${t.image})"
          class="card-header align-items-flex-end text-color-black justify-content-center">${t.nama_category}</div>
        <div class="card-content card-content-padding">
          <p>${t.description_category}</p>
        </div>
        <div class="card-footer"><a href="/recipecategory/${t.idcategory}" class="link">Read more</a></div>
      </div>
      </div>
      `);
        })
      });
  }
  if (page.name == 'recipe') {

    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {},
      function (data) {
        $$("#list-recipe").empty();
        var arr = JSON.parse(data);
        recipe_api = arr['data'];
        recipe_api.forEach((t, index) => {
          $$("#list-recipe").append(`
              <div class='col-50'>
        <div class="card demo-card-header-pic">
          <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/${t.idcategory}/${t.image_link})"
            class="card-header align-items-flex-end justify-content-center">${t.nama_recipes}</div>
          <div class="card-content card-content-padding">
            <p>Description</p>
            <p>${t.description_recipe}</p>
          </div>
          <div class="card-footer"><a href="/detailrecipe/${t.idrecipes}" class="link">Read more</a></div>
        </div>
        </div>
        `);
        });

      });

    $$('#txtcari').keyup(function () {
      
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {
        'cari': $$('#txtcari').val()
      }, function (data) {
        var arr = JSON.parse(data);
        recipe_api = arr['data'];
        $$("#list-recipe").empty();
        recipe_api.forEach((t, index) => {
          $$("#list-recipe").append(`
              <div class='col-50'>
        <div class="card demo-card-header-pic">
          <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/${t.idcategory}/${t.image_link})"
            class="card-header align-items-flex-end justify-content-center">${t.nama_recipes}</div>
          <div class="card-content card-content-padding">
            <p>Description</p>
            <p>${t.description_recipe}</p>
          </div>
          <div class="card-footer"><a href="/detailrecipe/${t.idrecipes}" class="link">Read more</a></div>
        </div>
        </div>
        `);
        })
      });
    });
  }
  if (page.name == "detailrecipe") {
    var id = page.router.currentRoute.params.id;
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {
      'recipes_id': id
    }, function (data) {
      var arr = JSON.parse(data);
      var recipes_api = arr['data'];
      var idcategory = recipes_api[0].idcategory;
      $$('#name_recipes').html(recipes_api[0].nama_recipes);
      $$('#description_recipes').html(recipes_api[0].description_recipe);
      $$('#image').html("<img src='http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/"+idcategory+"/"+recipes_api[0].image_link+"' style='border-radius: 10%;' width='100%'>")
      
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {
        'category_id': idcategory
      }, function (data) {
        var arr = JSON.parse(data);
        var categori_api = arr['data'];
        $$('#category_recipes').html(categori_api[0].nama_category);
      })
      var bahan_bahan = (recipes_api[0].bahan_bahan);
      for (i in bahan_bahan) {
        $$('#ingredients').append(bahan_bahan[i].replace('\n', '<br>'));
      }

      var cara_memasak = (recipes_api[0].cara_memasak);
      for (i in cara_memasak) {
        $$('#cooking_method').append(cara_memasak[i].replace("\n", "<br>"));
      }

    });

  }
  if (page.name == "recipecategory") {
    var id = page.router.currentRoute.params.id;
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {
        'category_id': id
      },
      function (data) {
        var arr = JSON.parse(data);
        recipe_api = arr['data'];
        recipe_api.forEach((t, index) => {
          $$("#list-recipecategory").append(`
        <div class='col-50'>
      <div class="card demo-card-header-pic">
        <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/${t.idcategory}/${t.image_link})"
          class="card-header align-items-flex-end">${t.nama_recipes}</div>
        <div class="card-content card-content-padding">
          <p>Description</p>
          <p>${t.description_recipe}</p>
        </div>
        <div class="card-footer"><a href="/detailrecipe/${t.idrecipes}" class="link">Read more</a></div>
      </div>
      </div>
      `);
        })
      });
  }
  if (page.name == "myrecipe") {
    console.log(typeof (localStorage.username) + localStorage.username);
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/myrecipe.php", {
        'username_pk': localStorage.username
      },
      function (data) {
        var arr = JSON.parse(data);
        recipe_api = arr['data'];
        recipe_api.forEach((t, index) => {
          $$("#list-myrecipe").append(`
        <div class='col-50'>
      <div class="card demo-card-header-pic">
        <div style="background-image:url(http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/${t.idcategory}/${t.image_link})"
          class="card-header align-items-flex-end justify-content-center">${t.nama_recipes}</div>
        <div class="card-content card-content-padding">
          <p>Description</p>
          <p>${t.description_recipe}</p>
        </div>
        <div class="card-footer"><a href="/detailmyrecipe/${t.idrecipes}" class="link">Read more</a></div>
      </div>
      </div>
      `);
        })
      });
  }
  if (page.name == 'newrecipe') {
    //Add Category
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {},
      function (data) {
        var arr = JSON.parse(data);
        category_api = arr['data'];
        for (var i = 0; i < category_api.length; i++) {
          $$("#sel_categories").append(
            "<option value='" + category_api[i]['idcategory'] + "'>" +
            category_api[i]['nama_category'] + "</option>");
        }
      });
    //Take
    $$('#btntakepicture').on('click', function (e) {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        targetWidth: 640,
        targetHeight: 480,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
      });

      function onSuccess(imageData) {
        $$('#imageupload').attr('src', "data:image/jpeg;base64," + imageData);
      }

      function onFail(message) {
        app.dialog.alert('Failed because: ' + message);
      }

    });

    $$("#btnadd").on('click', function () {

      var imgUri = $$("#imageupload").attr("src");
      // if (!imgUri) {
      //   app.dialog.alert("Please Select an Image First");
      //   return;
      // }
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/add_recipe.php", {
          'username': localStorage.username,
          'id_category': $$('#sel_categories').val(),
          'nama_recipes': $$('#tx_name').val(),
          'description_recipe': $$('#tx_description').val(),
          'bahan_bahan': $$('#tx_ingredients').val(),
          'cara_memasak': $$('#tx_cooking_method').val(),
        },
        function (data) {
          var arr = JSON.parse(data);
          var result = arr['result'];
          var id_baru = arr['id'];
          app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/update_imagelink.php",{
            'image_link': id_baru +".jpg",
            'id_recipe': id_baru
          },function(data){

          });
          var location = $$('#sel_categories').val() + "/" + id_baru;
          var options = new FileUploadOptions();
          options.fileKey = "photos";
          options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
          options.mimeType = "image/jpg";
          options.params = {
            id: location
          };
          //Update Image
          var ft = new FileTransfer();
          ft.upload(imgUri, encodeURI("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/uploadimage.php"),
            function (result) {
              app.dialog.alert("Upload Gambar Sukses",'Information');
            },
            function (error) {
              app.dialog.alert("Upload Gambar Gagal",'Information');
            }, options);
          //Insert Data
          if (result == 'success') {
            app.dialog.alert("Success Add Data", "Information");
            app.view.main.router.navigate('/', {
              reloadCurrent: true,
              pushState: false
            });
          } else {
            app.dialog.alert("Failed Add Data", "Information");
          }

        });
    
      });


  }
  if (page.name = 'profile') {
    app.calendar.create({
      inputEl: '#tx_datebirth',
      closeOnSelect: true,
      dateFormat: "yyyy-mm-dd"
    });
    app.request.post('http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/profile.php', {
        "username_pk": localStorage.username
      },
      function (data) {
        var arr = JSON.parse(data);
        var result = arr['data'];
        $$('#tx_username').val(result[0].username);
        $$('#tx_password').val(result[0].password);
        $$('#tx_nameprofile').val(result[0].nama);
        $$('#tx_datebirth').val(result[0].tanggal_lahir);
      });
    $$('#btnupdate').on('click', function () {
      $$('#tx_password').prop({
        disabled: false
      })
      $$('#tx_nameprofile').prop({
        disabled: false
      })
      $$('#tx_datebirth').prop({
        disabled: false
      })
      $$('#btnupdate').val("Save");
      $$('#btnupdate').attr('id', "btnsave");
      $$('#btnsave').on('click', function () {
        app.request.post('http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/profile_update.php', {
            "password": $$("#tx_password").val(),
            "nama": $$("#tx_nameprofile").val(),
            "tanggal_lahir": $$("#tx_datebirth").val(),
            "username": $$("#tx_username").val()
          },
          function (data) {
            var arr = JSON.parse(data);
            var result = arr['result'];
            if (result == 'success') {
              app.dialog.alert('Update Success', 'Information');
            } else {
              app.dialog.alert('Gagal menambah data', 'Information');
            }
          });
      })
    });
    $$('#btnlogout').on('click', function () {
      localStorage.removeItem("username");
      app.view.main.router.navigate('/login/', {
        reloadCurrent: true,
        pushState: false
      });
    })
  }
  if (page.name = "detailmyrecipe") {
    var id = page.router.currentRoute.params.id;
    //Ambil Data
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {
      'recipes_id': id
    }, function (data) {
      var arr = JSON.parse(data);
      var recipes_api = arr['data'];
      $$('#name_recipes').html(recipes_api[0].nama_recipes);
      $$('#description_recipes').html(recipes_api[0].description_recipe);
      var idcategory = recipes_api[0].idcategory;
      $$('#image').html("<img src='http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/image/recipe/"+idcategory+"/"+recipes_api[0].image_link+"' style='border-radius: 10%;' width='100%'>");
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {
        'category_id': idcategory
      }, function (data) {
        var arr = JSON.parse(data);
        var categori_api = arr['data'];
        $$('#category_recipes').html(categori_api[0].nama_category);
      })
      var bahan_bahan = (recipes_api[0].bahan_bahan);
      for (i in bahan_bahan) {
        $$('#ingredients').append(bahan_bahan[i].replace('\n', '<br>'));
      }
      var cara_memasak = (recipes_api[0].cara_memasak);
      for (i in cara_memasak) {
        $$('#cooking_method').append(cara_memasak[i].replace("\n", "<br>"));
      }
    });
    //Kosongi Jika Ada
    $$('#foodmyrecipe').empty();
    //Edit Movie
    $$('#foodmyrecipe').append("<a href='/updaterecipe/" + id + "' ><i class='icon f7-icons'>arrow_2_circlepath</i></a>");
    //Delete
    $$('#foodmyrecipe').append("<a href='#' class='' id='btnhapus'><i class='icon f7-icons'>trash</i></a>");
    $$('#btnhapus').on('click', function () {
      app.request.post('http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/delete_recipe.php', {
          "recipe_id": id
        },
        function (data) {
          var arr = JSON.parse(data);
          var result = arr['result'];
          if (result == 'success') {
            app.dialog.alert('Success Delete Recipe', 'Information');
            app.view.main.router.navigate('/myrecipe/', {
              reloadCurrent: true,
              pushState: false
            });
          } else app.dialog.alert('Failed Delete Recipe', 'Information');
        });
    });
  }
  if (page.name = "updaterecipe") {
    var id = page.router.currentRoute.params.id;
    //Ambil Data
    app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/recipe.php", {
      'recipes_id': id
    }, function (data) {
      var arr = JSON.parse(data);
      var recipes_api = arr['data'];
      $$('#tx_nameedit').val(recipes_api[0].nama_recipes);
      $$('#tx_descriptionedit').val(recipes_api[0].description_recipe);
      var idcategory = recipes_api[0].idcategory;
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/categories.php", {},
        function (data) {
          var arr = JSON.parse(data);
          category_api = arr['data'];
          for (var i = 0; i < category_api.length; i++) {
            if (category_api[i]['idcategory'] == idcategory) {
              $$("#sel_categoriessedit").append("<option value='" + category_api[i]['idcategory'] + "' selected>" + category_api[i]['nama_category'] + "</option>");
            } else {
              $$("#sel_categoriessedit").append("<option value='" + category_api[i]['idcategory'] + "'>" + category_api[i]['nama_category'] + "</option>");
            }
          }
        });
      var bahan_bahan = (recipes_api[0].bahan_bahan);
      for (i in bahan_bahan) {
        $$('#tx_ingredientsedit').append(bahan_bahan[i].replace('\n', '<br>'));
      }
      var cara_memasak = (recipes_api[0].cara_memasak);
      for (i in cara_memasak) {
        $$('#tx_cooking_methodedit').append(cara_memasak[i].replace("\n", "<br>"));
      }

    });

    //Update Data
    $$("#btnupdaterecipe").on("click", function(){
      app.request.post("http://ubaya.fun/hybrid/160419118/Vens_Recipi_UTS/update_recipe.php", {
        'id_category': $$('#sel_categoriessedit').val(),
        'nama_recipes': $$('#tx_nameedit').val(),
        'description_recipe': $$('#tx_descriptionedit').val(),
        'bahan_bahan': $$('#tx_ingredientsedit').val(),
        'cara_memasak': $$('#tx_cooking_methodedit').val(),
        'id_recipe' : id
      },
      function (data) {
        var arr = JSON.parse(data);
        var result = arr['result'];
        if (result == 'success') {
          app.dialog.alert("Success Update Data", "Information");
          app.view.main.router.navigate('/detailmyrecipe/'+ id, {
            reloadCurrent: true,
            pushState: false
          });
        } else {
          app.dialog.alert("Failed Update Data", "Information");
        }
      });
    });
    

    
  }

});