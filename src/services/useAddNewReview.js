import React from 'react'

const useAddNewReview = async (reviewPic,reviewerName) => {
    const uploadPromise = async () => {
        const data = new FormData()
        data.append('file',reviewPic)
        data.append('upload_preset',)
    }
}

export default useAddNewReview