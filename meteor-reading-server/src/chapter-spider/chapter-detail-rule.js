exports.parse = ($) => {
    return {
        content: $('#contents').html(),
        title: $('#amain').find('dd').eq(0).text().trim()
    };
};