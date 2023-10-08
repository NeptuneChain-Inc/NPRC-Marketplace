import { ref, set, get } from "firebase/database";
import { db } from "../apis/firebase"

const getData = async (path) => {
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    if (snapshot.val()) {
        return snapshot.val();
    } else {
        console.warn({ snapshot });
        return false;
    }
}


const saveData = async (path, data) => {
    try {
        const dataRef = ref(db, path);
        await set(dataRef, data);
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

const createUser = async (userData) => {
    if (userData?.uid) {
        const isSaved = await saveData(`dashboard/users/data/${userData?.uid}`, userData);
        if (isSaved) {
            if (await saveData(`dashboard/users/usernames/${userData?.username}`, userData?.uid)) {
                return await loadDefaultUserDashes(userData.uid, userData.type);
            } else {
                return false;
            }
        } else {
            return isSaved;
        }
    } else {
        console.warn({ userData });
        return false;
    }
}

const getUser = async (uid) => {
    return await getData(`dashboard/users/data/${uid}`);
}

const getUsername = async (username) => {
    const uid = await getData(`dashboard/users/usernames/${username}`);
    return await getUser(uid);
}

const getUserDashes = async (uid) => {
    return await getData(`dashboard/users/data/${uid}/dashData/`);
}

const loadDefaultUserDashes = async (uid, accountType) => {
    const defaultUserDashes = await getData(`dashboard/defaults/dashes/${accountType}`);
    if (defaultUserDashes) {
        return await saveData(`dashboard/users/data/${uid}/dashData/`,defaultUserDashes);
    } else {
        return defaultUserDashes
    }
}

// Save Stream
const saveStream = async (streamData, creatorUID) => {
    if (streamData?.playbackId && creatorUID) {
        const isSaved = await saveData(`dashboard/livepeer/streams/${streamData.playbackId}`, streamData);
        if (isSaved) {
            return await saveData(`dashboard/users/data/${creatorUID}/streams/${streamData.playbackId}`, streamData.playbackId);
        } else {
            return isSaved;
        }
    } else {
        console.warn({ streamData, creatorUID });
        return false;
    }
}

const getUserStreams = async (uid) => {
    const streamIDs = await getData(`dashboard/users/data/${uid}/streams/`);
    const streams = [];
    for (const streamID of Object.keys(streamIDs || {})) {
        const stream = await getStream(streamID);
        streams.push(stream);
    }
    return streams;
}

const getStream = async (playbackId) => {
    return await getData(`dashboard/livepeer/streams/${playbackId}`);
}

// Save Video
const saveVideo = async (videoAsset, creatorUID) => {
    if (videoAsset?.playbackId && creatorUID) {
        const isSaved = await saveData(`dashboard/livepeer/videos/${videoAsset.playbackId}`, videoAsset);
        if (isSaved) {
            return await saveData(`dashboard/users/data/${creatorUID}/videos/${videoAsset.playbackId}`, videoAsset.playbackId);
        } else {
            return isSaved;
        }
    } else {
        console.warn({ videoAsset, creatorUID })
        return false;
    }
}

const getVideo = async (playbackId) => {
    return await getData(`dashboard/livepeer/videos//${playbackId}`);
}

const getUserVideos = async (uid) => {
    const videoIDs = await getData(`dashboard/users/data/${uid}/videos/`);
    const videos = [];
    for (const videoID of Object.keys(videoIDs || {})) {
        const video = await getVideo(videoID);
        videos.push(video);
    }
    return videos;
}

export {
    createUser,
    getUser,
    getUsername,
    saveStream,
    getStream,
    getUserStreams,
    saveVideo,
    getVideo,
    getUserVideos
};