$(function() {
    "use strict";

    $("#getButton").click(getUserInfo);
    $("#getAllButton").click(getUserInfo);
});

const usersLink = "http://jsonplaceholder.typicode.com/users";
const postsLink = "http://jsonplaceholder.typicode.com/posts";
const commentsLink = "http://jsonplaceholder.typicode.com/comments";
let uidFiltered = false;

function getUserInfo() {
    if($(this).attr('id') == "getButton") {
        if ($("#userid").val() == ""){
            $("#info").append($("<p>", {"text":"Enter a valid User id!"}));
            return;
        }
        uidFiltered = true;
    }
    else if($(this).attr('id') == "getAllButton"){

        uidFiltered = false;
    }else{
        return;
    }

    $.ajax(uidFiltered ? usersLink+"?id="+$("#userid").val(): usersLink, {
        "type": "get",
    }).done(displayUser);
}

function displayUser(data) {
    $("#info > p").remove();
    $("#user > p").remove();
    $("#posts > table").remove();

    if (data.length == 0){
        $("#info").append($("<p>", {"text":"User id not found!"}));
        return;
    }
    if(uidFiltered){
        $("#user").append($("<p>", {"text":"User Name:"+data[0].name+", Email:"+data[0].email+", Address:"+JSON.stringify(data[0].address)}));
        $("#user").append($("<p>", {"text":"Address:"+JSON.stringify(data[0].address)}));
    }
    getAllPosts();

}

function getAllPosts() {
    $.ajax(uidFiltered ? postsLink+"?userId="+$("#userid").val(): postsLink, {
        "type": "get",

    }).done(displayPosts);
}

function displayPosts(data) {

    if(data.length == 0){
        $("#info").append($("<p>", {"text":"No post"}));
        return;
    }

    var table = $("<table>");
    let tr = $("<tr>");
    if (!uidFiltered)
        tr.append($("<th>", {"text":"User Id"}));
    tr.append($("<th>", {"text":"Post Id"}));
    tr.append($("<th>", {"text":"Title"}));
    tr.append($("<th>", {"text":"Body"}));

    table.append(tr);

    for (let i = 0; i < data.length; i++) {
        let tr = $("<tr>");
        if (!uidFiltered)
            tr.append($("<td>", {"text":data[i].userId}));
        tr.append($("<td>", {"text":data[i].id}));
        tr.append($("<td>", {"text":data[i].title}));
        tr.append($("<td>", {"text":data[i].body}));
        table.append(tr);
    }

    $("#posts").append(table);

}


