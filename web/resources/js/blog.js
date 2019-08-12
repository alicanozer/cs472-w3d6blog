$(function() {
    "use strict";

    $("#getButton").on("click", getUserInfo);
    $("#getAllButton").on("click", getUserInfo);
});

const usersLink = "http://jsonplaceholder.typicode.com/users";
const postsLink = "http://jsonplaceholder.typicode.com/posts";
const commentsLink = "http://jsonplaceholder.typicode.com/comments";
let uidFiltered = false;

/**
 * request user information from server is user id specified
 * otherwise
 */
function getUserInfo() {
    clearScreen();
    if($(this).attr('id') == "getButton") {
        if ($("#userid").val() == ""){
            clearScreen();
            $("#info").append($("<p>", {"text":"Enter a valid User id!"}));
            return;
        }
        uidFiltered = true;
        $.ajax(uidFiltered ? usersLink+"?id="+$("#userid").val(): usersLink, {
            "type": "get",
        }).done(displayUser);
    }
    else if($(this).attr('id') == "getAllButton"){

        uidFiltered = false;
        displayUser(null);
    }else{

    }
}
/**
 * display user in #user div
 * @param data data JSON object of user
 */
function displayUser(data) {
    if (data!= null && data.length == 0){
        clearScreen();
        $("#info").append($("<p>", {"text":"User id not found!"}));
        return;
    }
    if(uidFiltered){
        $("#user").append($("<p>", {"text":"User Name:"+data[0].name}));
        $("#user").append($("<p>", {"text":"Email:"+data[0].email}));
        $("#user").append($("<p>", {"text":"Address:"+JSON.stringify(data[0].address)}));
    }
    getAllPosts();
}
/**
 * requests posts from page
 */
function getAllPosts() {
    $.ajax(uidFiltered ? postsLink+"?userId="+$("#userid").val(): postsLink, {
        "type": "get",

    }).done(displayPosts);
}

/**
 * requests comments from page
 */
function getComments() {
    const postId= $(this).attr('id');
    $.ajax(commentsLink+"?postId="+postId, {
        "type": "get",

    }).done(displayComments);
}
/**
 * display posts in #posts div
 * @param data JSON object of posts
 */
function displayPosts(data) {
    if(data.length == 0){
        clearScreen();
        $("#info").append($("<p>", {"text":"No post"}));
        return;
    }
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            if (uidFiltered) {
                $("#posts").append($("<h2>", {"text": "Post of user " + data[i].userId}));
            } else {
                $("#posts").append($("<h2>", {"text": "All posts"}));
            }
        }

        var postDiv = $("<div>");
        let ul = $("<ul>");

        if (!uidFiltered)
            ul.append($("<li>", {"text":"User Id: "+data[i].userId}));

        ul.append($("<li>", {"text":"Post Id: "+data[i].id}));
        ul.append($("<li>", {"text":"Title: "+data[i].title}));
        ul.append($("<li>", {"text":"Body: "+data[i].body}));

        let c = $("<li>");
        let button = ($("<input>", {"id":data[i].id, "type":"button", "value":"Show Comments"}));
        button.on("click", getComments);
        c.append(button);
        ul.append(c);

        postDiv.append(ul);
        $("#posts").append(postDiv);
    }
}
/**
 * display comments in #comment div
 * @param data data JSON object of comments
 */
function displayComments(data) {
    $("#comments").empty();

    for (let i = 0; i < data.length; i++) {
        if (i === 0){
            $("#comments").append($("<h2>",{"text":"Comments of post "+data[i].postId}));
        }

        var postDiv = $("<div>");
        let ul = $("<ul>");

        ul.append($("<li>", {"text":"Name: "+data[i].name}));
        ul.append($("<li>", {"text":"Email: "+data[i].email}));
        ul.append($("<li>", {"text":"Body: "+data[i].body}));

        postDiv.append(ul);
        $("#comments").append(postDiv);
    }
}
/**
 * clears screen for new search
 */
function clearScreen() {
    $("#info").empty();
    $("#user").empty();
    $("#posts").empty();
    $("#comments").empty();
}