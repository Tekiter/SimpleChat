
export function UserList() {
    this.users = {}
}

UserList.prototype.register = function (id, nickname, addr) {
    this.users[id] = {
        nickname: nickname,
        address: addr.address,
        port: addr.port
    }
}

UserList.prototype.get = function (id) {
    return this.users[id]
}

UserList.prototype.registered = function(id) {
    return !!this.get(id)
}

