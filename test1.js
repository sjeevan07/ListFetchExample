import CreateList from "/list.js";
import DataFetch from "/fetch.js";

const createList = new CreateList();
const dataFetch = new DataFetch(createList);

createList.createUnorderedList();
dataFetch.fetchapi();


