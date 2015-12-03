(function() {
  'use strict';

  angular
    .module('angularjsTutorial')
    .controller('MainController', MainController)
    .controller('StudentController', StudentController)
    .controller('UserController',UserController)
    .controller('PlayListController',PlayListController)
    .controller('ContactController',ContactController)
    .controller('AddContactController',AddContactController)
    .controller('ThemePickerController',ThemePickerController)
    .controller('SimonSaysController',SimonSaysController)
    .controller('WeatherController',WeatherController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1445483324815;
    vm.showToastr = showToastr;
      
    vm.projects = [
        {title: 'User',
         url: '#/User',
         type: 'workshop #1',
         logo: 'User.png',
         objective:'The task at hand is to show the user their first and last name on the page along with an edit button.'
        },
        {title: 'Student',
         url: '#/Student',
         type: 'workshop #2',
         logo: 'Student.png',
         objective: 'get more familiar with writing custom angular services (factories, services and values).'
        },
        {title: 'Play List',
         url: '#/PlayList',
         type: 'workshop #3',
         logo: 'PlayList.png',
         objective:'The purpose of this workshop is to give you further practice with using AngularJS factories, services and values.'
        },
        {title: 'Contact',
         url: '#/Contact',
         type: 'workshop #4',
         logo: 'Contact.png',
         objective:'Use UI-Route for single page application with view for each state'
        },
        {title: 'Add Contact',
         url: '#/AddContact',
         type: 'workshop #4',
         logo: 'AddContact.png',
         objective:'Use UI-Route for single page application with view for each state'
        },
        {title: 'Theme Picker',
         url: '#/ThemePicker',
         type: 'Homework #1',
         logo: 'ThemePicker.png',
         objective:'The purpose of this assignment is to get everyone familiar with angular built-in directives. Also, to start you off thinking in an angular frame of mind.'
        },
        {title: 'Simon Says',
         url: '#/SimonSays',
         type: 'Homework #2',
         logo: 'SimonSays.png',
         objective:'Classic game of Simon. The purpose of this assignment is to get us familiar with the built in directives and services that angular offers.'
        },
        {title: 'Weather Forecast',
         url: '#/WeatherForecast',
         type: 'Final Project',
         logo: 'weather.png',
         objective:"Your final project is to create a simple (or not so simple!) web application that uses most of the concepts we've learned so far in class. "
        }
        
    ];

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }

function StudentController($scope, Student){
    var self = this;
    self.name = null;
    self.avg = null;
    self.grd = null;
    self.passing = null;
    self.students = [];
    self.names = [];

    self.addTask =function (name, task, score){
        var assignment = {
            task:task,
            score:score
        };
        if(self.names.length==0 || !(self.names.indexOf(name) > -1)) {
            console.log("new student");
            self.student = new Student(name);
            self.students.push(self.student);
            self.names.push(name);
        }
        self.student = getStudent(name);
        self.student.addAssignment(assignment);
        self.avg = self.student.average();
        self.grd = self.student.grade();
        self.passing = self.student.passed();
        console.log(self.students);
    };

    function getStudent (name){
        for(var i=0;i<self.students.length;i++){
            if(self.students[i].name == name)
                return self.students[i];
        }
    }
}
    
function UserController(){
    var self = this;
    self.mode='display';

    self.user = {
        first: 'Xin',
        last: 'Wang',
        email: 'xin.wang@cmegroup.com'
    };

    self.user2 = {};
    angular.copy(self.user,self.user2);

    self.submit=function(){
        angular.copy(self.user2,self.user);
        self.mode = 'display';
    };

    self.cancel=function(){
        self.mode='display';
    };
}
    
function PlayListController($scope, MusicProfile){
    var self = this;
    self.genre = {
        Pop:['Crazy 1', 'Hola 2', 'Im awesome 3'],
        Rock:['Rock and roll 1', 'Die hard 2', 'Earthquick 3'],
        Rap:['Fast and furious 1', 'Cannot keep up with you 2', 'General Taos 3']
    };
    self.playList = [];
    self.selectedGenre = self.genre.Pop;
    self.selectedType = 'clean';
    self.name = null;
    self.age = null;
    self.names = [];
    self.profiles = [];

    self.addSong = function(song){
        if(self.playList.indexOf(song)> -1){
            var index = self.playList.indexOf(song);
            if (index !== -1) {
                self.playList.splice(index, 1);
            }
        }
        else
            self.playList.push(song);
    };

    self.showPlayList = function(){
        if(self.names.length==0 || !(self.names.indexOf(self.name) > -1)) {
            console.log("new profile");
            self.profile = new MusicProfile(self.name,self.age);
            self.profiles.push(self.profile);
            self.names.push(self.name);
        }
        self.profile = getProfile(self.name);
        self.profile.addSong(self.playList,self.selectedType);
    };

    function getProfile (name){
        console.log(self.profiles);
        for(var i=0;i<self.profiles.length;i++){
            if(self.profiles[i].name == name) {
                return self.profiles[i];
            }
        }
    }
    self.reset = function(){
        self.name = null;
        self.age = null;
        self.playList = [];
        self.selectedGenre = self.genre.Pop;
        self.selectedType = 'clean';
    };
}

function ThemePickerController() {
    var self = this;
    self.userObjectSelection=0;
    self.idx = 0;
    self.text = '';
    self.choices = ['NONE','SUCCESS','SKY','WARNING','DANGER','NIGHT'];
    self.bodyColor = ['white','lightgreen','lightblue','lightyellow','pink','lightgray'];
    self.div1Color = ['gray','darkgree ','darkblue','brown','darkred','black'];
    self.div2Color = ['lightgray','green','blue','yellow','red','midnightblue'];
    self.fontColor = ['black','white','white','black','white','white'];
    self.categories = {
        Personal:['tv'],
        Work:['meeting'],
        Trip:['ny','boston']
    };
    self.showFolder = function(){
        if(self.collaps) return 'glyphicon glyphicon-folder-close';
        else return 'glyphicon glyphicon-folder-open';
    };

    self.addContent = function(idx,content){
        if(idx==0)
            self.categories.Personal.push(content);
        if(idx==1)
            self.categories.Work.push(content);
        if(idx==2)
            self.categories.Trip.push(content);
        self.text = '';
    };    
}    
    
function ContactController(ContactService){
    var self = this;
    self.contacts = ContactService.contacts ;

}

function AddContactController(Contact, ContactService){
    var self = this;
    self.addContact = function(fname,lname,phone){
        console.log("adding" + fname, lname, phone);
        self.contact = new Contact(fname,lname,phone);
        ContactService.addContact(self.contact);
        console.log(ContactService.contacts);
        self.first = '';
        self.last = '';
        self.phone = '';
    };
    
}
    
function WeatherController($scope, WeatherResource, WeatherProfile, CityResource){
    var self = this;
    self.days = 5;
    self.weatherProfiles = [];
    self.model = 'F';
    self.chartType = 'chart chart-line';
    
  self.onClick = function (points, evt) {
    console.log(points, evt);
  };

     CityResource.query().$promise.then(function onSuccess(cityArray) {
       //getting the response
       console.log(cityArray[0][0]);
       self.cityArray = cityArray;
     }, function onError(errorResponse) {
       console.log('ERROR!!!')
     });
    
    self.getWeatherResource = function(city, model){
        console.log(model);
        console.log(self.model);
        if(self.model != model){
            self.model = model;
            self.showGraph();
        }
        if(!city) return;
        WeatherResource.get({city: city, cnt:self.days})
        .$promise.then(function onSuccess(response){    
            self.result = response;
            self.showGraph();
            console.log(self.result);
        });
        self.city = '';
    }
    
    self.showGraph = function(){
        console.log("show chart");
        self.labels = [];
        self.series = [];
        self.data = [];
        var day = [];
        var min = [];
        var max = [];
        for(var i=0;i<self.result.list.length;i++){
            self.labels.push((new Date(self.result.list[i].dt*1000)).toLocaleFormat('%d-%b-%Y'));
            day.push(self.convertTemp(self.result.list[i].temp.day,self.model));
            min.push(self.convertTemp(self.result.list[i].temp.min,self.model));
            max.push(self.convertTemp(self.result.list[i].temp.max,self.model));
        }
        self.series = ["Day", "High", "Low"];
        self.data.push(day);
        self.data.push(max);
        self.data.push(min);
        console.log(self.labels);
        console.log(self.data);
    }
    
    self.changeGraph = function(type){
        self.labels = [];
        self.series = [];
        self.data = [];
        
        if(type == 'Temp'){
            var day = [];
            var min = [];
            var max = [];
            for(var i=0;i<self.result.list.length;i++){
                self.labels.push((new Date(self.result.list[i].dt*1000)).toLocaleFormat('%d-%b-%Y'));
                day.push(self.convertTemp(self.result.list[i].temp.day,self.model));
                min.push(self.convertTemp(self.result.list[i].temp.min,self.model));
                max.push(self.convertTemp(self.result.list[i].temp.max,self.model));
            }
            self.series = ["Day", "High", "Low"];
            self.data.push(day);
            self.data.push(max);
            self.data.push(min);
        }
        else if(type == 'Pressure'){
            var pres = [];
            for(var i=0;i<self.result.list.length;i++){
                self.labels.push((new Date(self.result.list[i].dt*1000)).toLocaleFormat('%d-%b-%Y'));
                pres.push(self.result.list[i].pressure);                
            }
            self.series = ["Pressure"];
            self.data.push(pres);
        }else if(type == 'Humidity'){
            var pres = [];
            for(var i=0;i<self.result.list.length;i++){
                self.labels.push((new Date(self.result.list[i].dt*1000)).toLocaleFormat('%d-%b-%Y'));
                pres.push(self.result.list[i].humidity);                
            }
            self.series = ["Humidity"];
            self.data.push(pres);
        }else if(type == 'Wind'){
            var pres = [];
            for(var i=0;i<self.result.list.length;i++){
                self.labels.push((new Date(self.result.list[i].dt*1000)).toLocaleFormat('%d-%b-%Y'));
                pres.push(self.result.list[i].speed);                
            }
            self.series = ["Wind"];
            self.data.push(pres);
        }
    }
    
    self.onClick = function (points, evt) {
        console.log(points, evt);
    };
    
    self.addProfile = function(city){
        console.log("adding city");
        var profile = new WeatherProfile(city);
        for(var i=0; i<self.weatherProfiles.length;i++){
            if(self.weatherProfiles[i].city.name === city.name) return;
        }
        self.weatherProfiles.push(profile);
        console.log(self.weatherProfiles);
    }
    
    self.convertTemp = function(degK, model) {
        if(model == 'C')
            return Math.round(degK - 273);
        else return Math.round((1.8 * (degK - 273)) + 32);
    }
    
    self.convertToDate = function(dt) { 
        return new Date(dt * 1000);
    };
    
}
    
function SimonSaysController($scope,$timeout) {
    var self = this;
    self.colors = {
        blue: 'blue',
        red: 'red',
        orange: 'orange',
        green: 'green',
        blink: 'black'
    };
    self.red = self.colors.red;
    self.blue = self.colors.blue;
    self.green = self.colors.green;
    self.orange = self.colors.orange;

    self.myColors = [];
    self.simonColors = [];
    self.mode = 'Over';
    self.score = 0;
    self.highScore = 0;
    self.around = 0;
    self.color = null;

    $scope.$watch ("simonCtrl.around", function(newval,oldval){
        //console.log("new " + newval + " old " + oldval);
        if(newval != oldval) {
            check();
        }
    }, true);

    function check(){
        //console.log("checking my colors");
        //console.log(self.myColors);
        for(var i=0;i<self.myColors.length;i++){
            //console.log("Your color: " + self.myColors[i] + " and Simon's color: " + self.simonColors[i]);
            if(self.simonColors[i] == self.myColors[i]){
                console.log("correct");
            }
            else {
                console.log("incorrect");
                gameOver();
            }
        }
        if(self.message != 'Game Over'){
            if(self.myColors.length == self.simonColors.length) {
                scored();
                self.simonTurn();
            }
        }
    }
    self.start = function() {
        self.score = 0;
        self.myColors = [];
        self.simonColors = [];
        self.message = '';
        self.mode = 'Simon';
        nextMove();
    };

    self.simonTurn = function(){
        self.mode = 'Simon';
        console.log("Simon's turn");
        //console.log(self.simonColors);
        self.message = 'Watch Me';
        //$timeout(oldMove,1000);
        oldMove();
        $timeout(nextMove,1000+ self.simonColors.length * 1000);
    };

    function oldMove(){
        var i = 0;
        function myLoop(){
            self.color = self.simonColors[i];
            $timeout(function(){
                console.log('simon clicked ' + self.color);
                $scope.$apply(function(){
                    self.class = '';
                    if(self.color == 'red'){
                        self.class = 'red';
                    }if(self.color == 'blue'){
                        self.class = 'blue';
                    }if(self.color == 'orange'){
                        self.class = 'orange';
                    }if(self.color == 'green'){
                        self.class = 'green';
                    }
                });
                i++;
                if(i<self.simonColors.length){
                    myLoop();
                }
            },1000);
        }
        myLoop();
    }

    function nextMove(){

        var randomNumber = Math.floor((Math.random() * 4) + 1);
        if (randomNumber == 1) {
            simonClick('blue');
            self.simonColors.push('blue');
        } else if (randomNumber == 2) {
            simonClick('orange');
            self.simonColors.push('orange');
        }
        else if (randomNumber == 3) {
            simonClick('red');
            self.simonColors.push('red');
        }
        else if (randomNumber == 4) {
            simonClick('green');
            self.simonColors.push('green');
        }
        resetClass();
        self.yourTurn();
    }

    function simonClick (color){
        setTimeout(function(){
            console.log('simon clicked ' + color);
            $scope.$apply(function(){
                self.class = '';
                if(color == 'red'){
                    self.class = 'red';
                }if(color == 'blue'){
                    self.class = 'blue';
                }if(color == 'orange'){
                    self.class = 'orange';
                }if(color == 'green'){
                    self.class = 'green';
                }
            })
        }, 1000);

    }

    self.yourTurn = function(){
        console.log(self.simonColors);
        $timeout(function(){
            self.mode = 'Your';
            self.message = 'Your Turn';
            console.log("Your turn" + self.around );
        },1000 + self.simonColors.length * 1000);
    };

    self.youClicked = function (color){
        self.class = '';
        if(color=='red'){
            console.log("You clicked red");
            self.class = 'red';
            self.myColors.push(self.red);
            self.around ++;
        }
        if(color=='orange'){
            console.log("You clicked orange");
            self.class = 'orange';
            self.myColors.push(self.orange);
            self.around ++;
        }
        if(color=='blue'){
            console.log("You clicked blue");
            self.class = 'blue';
            self.myColors.push(self.blue);
            self.around ++;

        }
        if(color=='green'){
            console.log("You clicked green");
            self.class = 'green';
            self.myColors.push(self.green);
            self.around ++;
        }
        $timeout(resetClass,1000);

    };

    function resetClass(){
        setTimeout(function(){
            console.log('reset class');
            $scope.$apply(function(){
                self.class = '';
            })
        }, 1500);
    }

    function scored(){
        if(self.around >= self.simonColors.length){
            self.score ++;
            self.myColors = [];
            console.log("scored, reset my colors");
            self.message = "great!";
        }
    }

    function gameOver(){
        self.myColors = [];
        self.simonColors = [];
        self.mode = 'Over';
        self.score = 0;
        self.around = 0;
        self.message = 'Game Over';
        resetClass();
    }

}
    
})();
