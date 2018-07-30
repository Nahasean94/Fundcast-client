pragma solidity ^0.4.19;

contract Todo {
    address public owner;
    //declares the number of todoItems
    uint numberOfTodoItems = 0;


    //an event to know when a todoItem is added
    event AddedTodoItem(string todoItem);

    //struct to hold an todoItem
    struct TodoItem {
        string name;
        uint createdAt;
        bool complete;
    }
    //mapping to hold todoItems
    mapping(uint => TodoItem) todoItems;

    constructor() public {
        if (msg.sender == owner) selfdestruct(owner);
    }

    function kill() public {
        selfdestruct(owner);
    }

    function getAddress() public constant returns (address){
        return msg.sender;
    }
    //add a TodoItem
    function addTodo(string m) public {
        uint todoItemId = numberOfTodoItems++;
        todoItems[todoItemId] = TodoItem(m, now, false);
        emit AddedTodoItem(m);

    }

    function getInsertedTodo() public constant returns (string, uint, bool){
        return (todoItems[numberOfTodoItems - 1].name, todoItems[numberOfTodoItems - 1].createdAt, todoItems[numberOfTodoItems - 1].complete);
    }

    function deleteTodo(uint id) public {
        delete todoItems[id];
    }

    function deleteInsertedTodo() public {
        delete todoItems[numberOfTodoItems - 1];
    }

    function markTodoComplete(uint id) public {
        todoItems[id].complete = true;
    }

    function markTodoInComplete(uint id) public {
        todoItems[id].complete = false;
    }

    function editTodo(uint id, string name) public {
        todoItems[id].name = name;
    }

    function getNumberOfTodos() public constant returns (uint){
        return numberOfTodoItems;
    }

    //return todoItemId
    function getTodo(uint id) public constant returns (string, uint, bool){
        return (todoItems[id].name, todoItems[id].createdAt, todoItems[id].complete);
    }

}