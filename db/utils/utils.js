exports.formatDates = list => {
    return list.map(item => {
        const newItem = {...item}
        newItem.created_at = new Date(newItem.created_at)
        return newItem  
    });
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
    const newArr = formattedArr.map(comment => {

        const newComment = {...comment}
        newComment.created_at = new Date(comment.created_at)

        if(newComment.created_by) {
            newComment.author = comment.created_by
        delete newComment.created_by
        }

        if (newComment.belongs_to) {
            newComment.article_id = articleRef[comment.belongs_to]
        delete newComment.belongs_to
        }
        return newComment
    })



    // formattedArr.forEach(comment => {

    //     const newComment = {...comment}


    //     if(newComment.created_by) {
    //         newComment.author = comment.created_by
    //     delete newComment.created_by
    //     }

    //     if (newComment.belongs_to) {
    //         newComment.article_id = articleRef[comment.belongs_to]
    //     delete newComment.belongs_to
    //     }

    // })  

    return newArr
};
