export default class CreateList{
    #unorderedList

    createUnorderedList(){
        this.#unorderedList = document.createElement("ul")
        document.body.appendChild(this.#unorderedList);
        this.#unorderedList.id = "unorderedList"
    }
    createListItems(data){
        let dataList = [];
        data.forEach(element => {
            let listItem = document.createElement("li");
            listItem.id = `listItems${element.id}`
            listItem.innerHTML = element.name
            dataList.push(listItem)
        });
        this.#unorderedList.append(...dataList)
    }
}