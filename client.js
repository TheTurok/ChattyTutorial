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

			//get already connected users first
			axios.get('/onlineusers')
				.then(function(response){
					for(var key in response.data){
						if(this.onlineUsers.indexOf(key) <= -1){
							this.onlineUsers.push(key);
						}
					}
					console.log(this.onlineUsers);
				}.bind(this));

			
		}.bind(this));

		//iff server bporadcast user left
		socket.on('userleft', function(socketId){
			var index = this.onlineUsers.indexOf(socketId);
			if(index > -1){ // 0 or more
				this.onlineUsers.splice(index, 1);
			}
		}.bind(this)); //don't forget to bind

		//update chat message
		socket.on('chatmessage',function(message){
			this.messages.push(message);
		}.bind(this));

	},
	methods:{
		send: function(){
			this.message.type = "chat";
			this.message.user = socket.id;
			this.message.timestamp = "Today";
			socket.emit('chatmessage', this.message);

			this.message.type = ''; //reset
			this.message.user = '';
			this.message.text = '';
			this.message.timestamp = '';

		},
		userIsTyping: function(username){

		},
		usersAreTyping: function(){

		},
		stoppedTyping:function (){

		},

	}

})
