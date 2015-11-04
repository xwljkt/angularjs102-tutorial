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
    .controller('ThemePickerController',ThemePickerController);

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
            self.categories.Trip.push(content);
        if(idx==2)
            self.categories.Work.push(content);
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
    
})();
