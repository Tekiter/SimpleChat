import { map } from "bluebird-lst"

export function UserList() {
    this.users = {}
}

UserList.prototype.register = function (id, nickname, addr) {
    this.users[id] = {
        nickname: nickname,
        address: addr
    }
}

UserList.prototype.get = function (id) {
    return this.users[id]
}

UserList.prototype.registered = function(id) {
    return !!this.get(id)
}

UserList.prototype.unregister = function (id) {
    delete this.users[id]
}

UserList.prototype.getUsers = function () {
    
    return Object.keys(this.users).map((i) => {return{ nickname: this.users[i].nickname }})
    // return this.users.map((i) => { nickname: i.nickname })
    
}

UserList.prototype.getUsersFull = function() {
    return Object.keys(this.users).map((i) => {return{ nickname: this.users[i].nickname }})
    
}