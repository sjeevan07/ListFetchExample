export default class DataFetch {
    #myrequest
    #listParent
    constructor(listParent) {
        this.#myrequest = new Request("https://jsonplaceholder.typicode.com/users");
        this.#listParent = listParent
    }
    fetchapi() {
        const that = this
        fetch(this.#myrequest)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(`HTTP errorerrty! status: ${response.status}`);
                }
                return response.json();
            }).then(function (data) {
                    that.#listParent.createListItems(data)
            });
    }
}