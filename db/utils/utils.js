exports.formatDates = list => {
    const newList = [...list]

    newList.forEach(item => {
       const newDate = new Date(item.created_at)
       console.log(newDate)
       item.created_at = newDate   
    });
    return newList
};

exports.makeRefObj = list => {
    const obj = {};

    list.forEach(article => {
        obj[article.title] = article.article_id
    });

    return obj
};

exports.formatComments = (comments, articleRef) => {
    const formattedArr = [...comments];


    formattedArr.forEach(comment => {
        if(comment.created_by) {
        comment.author = comment.created_by
        delete comment.created_by
        }
        if (comment.belongs_to) {
        comment.article_id = articleRef[comment.belongs_to]
        delete comment.belongs_to
        }
    })  

    return comments
};
