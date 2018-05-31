var socket = io();

new Vue({
	el: '#app',
	data:{
		onlineUsers: [], 
		messages: [],
		message: {
			"type": "",
			"action": "",
			"user": "",
			"text": "",
			"timestamp": ""
		},
		areTyping: []
	},
	created: function(){
		//if server emits 'userjoined' then update connected users array
		socket.on('userjoined',function(socketId){
			this.onlineUsers.push(socketId);
		}.bind(this));
	},
	methods:{
		send: function(){

		},
		userIsTyping: function(username){

		},
		usersAreTyping: function(){

		},
		stoppedTyping:function (){

		},

	}

})
