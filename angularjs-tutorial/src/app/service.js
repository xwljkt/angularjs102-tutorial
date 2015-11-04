(function() {
  'use strict';

  angular
    .module('angularjsTutorial')
    .factory('Student', Student)
    .factory('MusicProfile',MusicProfile)
    .factory('Contact',Contact)
    .service('ContactService',ContactService)
    .service('Calculator',Calculator);

  /** @ngInject */
  function Calculator() {
        var self = this;
        self.average = function(scores){
            var count = 0;
            for (var i=0; i < scores.length; i++) {
                count += parseInt(scores[i]);
            }
            return count/scores.length;
        };

        self.getGrade =function(grade){
            if(grade > 90) return 'A';
            if(grade > 80) return 'B';
            if(grade > 70) return 'C';
            if(grade > 60) return 'D';
            return 'F';
        };

        self.isPassing = function(grade){
            return grade > 60;
        }
    }
    
    function Student(Calculator) {
        function Student(name){
            this.name = name;
            this.assignments = [];
            this.scores = [];
            this.avg = null;
            this.grd = null;
            this.passing = null;
        }

        Student.prototype.addAssignment = function(assignment){
            this.assignments.push(assignment);
            this.scores.push(assignment.score);
            this.avg = Calculator.average(this.scores);
            this.grd = Calculator.getGrade(this.avg);
            this.passing = Calculator.isPassing(this.avg);
        };

        Student.prototype.grade = function(){
            return this.grd;
        };
        Student.prototype.average = function(){
            return this.avg;
        };
        Student.prototype.passed = function(){
            return this.passing;
        };

        return Student;
    }
    
    function Contact() {
        function Contact(fname,lname,phone){
            this.fname = fname;
            this.lname = lname;
            this.phone = phone;
        }
        return Contact;
    }
    
    function ContactService(){
        var self = this;
        self.contacts = [];
        
        self.addContact= function(contact){
            self.contacts.push(contact);
        }
    
    }
    
    function MusicProfile(){
        function MusicProfile(name,age){
            console.log(name + age);
            this.name = name;
            this.age = age;
            this.playList = [];
        }

        MusicProfile.prototype.addSong = function(list, type){
            console.log(list);
            var tempList = angular.copy(list);
            this.playList = [];
            for(var i=0;i<tempList.length;i++){
                this.playList.push({title:tempList[i],type:type});
            }
        };

        return MusicProfile;
    }
})();


