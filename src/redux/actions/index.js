export const saladDetails = (salad_details) => {
    return {
        type: 'SALAD_DETAILS',
        payload: salad_details
    }
}

export const userDetails = (user_details) => {
    return {
        type: 'USER_DETAILS',
        payload: user_details
    }
}