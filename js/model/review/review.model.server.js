module.exports = function () {
    var mongoose = require('mongoose');
    var reviewSchema = require('./review.schema.server');

    var reviewModel = mongoose.model('reviews', reviewSchema);

    reviewModel.createReview = createReview;
    reviewModel.findReviewByRestaurant = findReviewByRestaurant;
    reviewModel.findReviewById = findReviewById;
    reviewModel.updateReview = updateReview;
    reviewModel.deleteReview = deleteReview;

    module.exports = reviewModel;

    return {
        createReview: createReview,
        findReviewByRestaurant: findReviewByRestaurant,
        findReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };


    function createReview(newReview) {
        return reviewModel.collection.insert(newReview);
    }

    function findReviewByRestaurant(restaurant) {
        return reviewModel.find({restaurant: restaurant});
    }

    function findReviewById(reviewId) {
        return reviewModel.findById(reviewId);
    }

    function updateReview(id, newReview) {
        return reviewModel.update(
            {_id: id},
            {$set: newReview}
        );
    }

    function deleteReview(reviewId) {
        return reviewModel.remove({_id: reviewId});
    }
};