//L5 
import React, {useEffect, useState} from "react";
import reviewService from "../../api/reviewService";


const TransactionReviewSection = ({ transaction }) => {
    // console.log("=== TransactionReviewSection ===");
    // console.log("Full transaction:", transaction);
    // console.log("transaction.cust_id:", transaction?.cust_id);
    // console.log("transaction.merchant_id:", transaction?.merchant_id);
    // console.log("transaction.merchant_txn_id:", transaction?.merchant_txn_id);
    // console.log("transaction.hasReviewed:", transaction?.hasReviewed);
    // console.log("transaction.rating:", transaction?.rating);
    
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(Number(transaction?.rating || 0));
    const [hasReviewed, setHasReviewed] = useState(transaction?.hasReviewed || false);
    const [loading, setLoading] = useState(false)
    const [reviewError, setReviewError] = useState(null)

    useEffect(() => {
        setRating(Number(transaction?.rating || 0));
        setHasReviewed(transaction?.hasReviewed || false);
    }, [transaction]);
    

    const handleSubmitReview = async() => {
        if(hasReviewed) return;

        if(rating === 0) {
            setReviewError("Please Select A Star Rating.")            
            return
        }

        try {
            setLoading(true)
            setReviewError(null)

            const executeReview = await reviewService.newSingleCustomerReviewPg(
                transaction.merchant_id,
                transaction.merchant_txn_id,
                transaction.cust_id,
                rating,
                reviewText
            )

            setHasReviewed(true);
            setReviewText("");

        } catch (err) {
            console.error("Failed to submit review:", err);
            setReviewError(
                err.response?.data?.message || "Failed to submit review."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Review this transaction
            </h3>

            <div className={`flex gap-1 text-3xl select-none justify-center ${hasReviewed ? "cursor-default" : "cursor-pointer"}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                        onMouseEnter={() => { if (!hasReviewed) setRating(star); }}
                        onClick={() => { if (!hasReviewed)
                            console.log("User clicked star:", star);
    console.log("Previous rating:", rating);
    console.log("New rating:", star);
                            setRating(star); 
                        }}
                    >
                    ★
                    </span>
                ))}
            </div>


            {hasReviewed ? (
                <p className="text-xs text-gray-500 mt-2">
                    You have already rated this transaction.
                </p>
            ) : (
                <div className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">
                            Write your review
                        </label>

                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            maxLength={255}
                            placeholder="Share your experience..."
                            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {reviewError && (
                        <p className="text-sm text-red-500">{reviewError}</p>
                    )}

                    <button
                        type="button"
                        onClick={handleSubmitReview}
                        disabled={loading}
                        className="w-full bg-green-600 text-white rounded-xl py-2 text-sm font-semibold disabled:bg-gray-400"
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default TransactionReviewSection



// const [rating, setRating] = useState(0)
// const [hasReviewed, setHasReviewed] = useState(false)
// const [checkingReview, setCheckingReview] = useState(true);
 // useEffect(() => {
    //     if(!transaction) return;

    //     const fetchExistingReview = async() => {
    //         try {
    //             setCheckingReview(true);
    //             const fetchedReview = await reviewService.getSingleCustomerReviewPg(
    //                 transaction.merchant_id,
    //                 transaction.merchant_txn_id
    //             )
    //             const fetchedReviewData = fetchedReview.data
    //             setHasReviewed(fetchedReviewData.hasReviewed)
    //             if (fetchedReviewData.rating) {
    //                 setRating(fetchedReviewData.rating);
    //             }
    //         } catch(error) {
    //             console.log(error)
    //             console.log("Failed to fetch review status")

    //         } finally{
    //             setCheckingReview(false);
    //         }
    //     }

    //     fetchExistingReview()

    // }, [transaction]);

    // if (checkingReview) {
    //     return null;
    // }