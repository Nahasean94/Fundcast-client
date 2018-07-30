
import {ADD_PODCAST, UPDATE_PODCAST, CLEAR_PODCASTS, DELETE_PODCAST} from "./types"

export function addPodcast(podcast) {
    return {
        type:ADD_PODCAST,
        payload:podcast
    }
}

export function updatePodcast(podcast) {
    return {
        type:UPDATE_PODCAST,
        payload:podcast
    }
}

export function clearPodcasts() {
    return {
        type:CLEAR_PODCASTS,
        payload:{}
    }
}
export function deletePodcast(podcast) {
return {
    type:DELETE_PODCAST,
    payload:podcast
}
}