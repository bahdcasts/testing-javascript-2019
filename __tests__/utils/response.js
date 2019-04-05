export default class Response {
    status(status) {
        this.status = status

        return this
    }

    json(data) {
        return data
    }
}
