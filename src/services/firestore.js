import {auth, firestore} from './firebase';
import _ from 'lodash';

const usersRef = firestore.collection('users');
const tracksRef = firestore.collection('tracks');

// User API
export const createUser = (id, email, firstname, lastname, location, role) => {
    console.log('createuser', id);
    return usersRef.doc(id).set({
        email,
        firstname,
        lastname,
        location,
        role,
    });
}

export const createCreator = (email, firstname, lastname, phone, website, social, gear, role) => {
    return firestore.collection('creators').add({
        email,
        firstname,
        lastname,
        phone,
        website,
        social,
        gear,
        role,
    });
}

export const getUser = async (id) => {
    return usersRef.doc(id).get();
}

export const getTracks = async (keyword = '') => {
    const alltrackssnapshot = await tracksRef.get();
    const alltracks = alltrackssnapshot.docs.map(item => ({id: item.id, ...item.data()}));
    console.log(alltracks);
    if (keyword == '') {
        return alltracks;
    }
    keyword = keyword.toUpperCase();
    const tracks = alltracks.filter(track => track.tags.toUpperCase().includes(keyword));
    return tracks;
}

export const addTrackIdToUser = async (fieldname, id) => {
    const userid = auth.currentUser.uid;
    const userDoc = await usersRef.doc(userid).get();
    if (!userDoc.exists) return;
    let userInfo = userDoc.data();
    let fieldValue = [];
    if (userInfo.hasOwnProperty(fieldname))
        fieldValue = userInfo[fieldname];

    if (fieldValue.indexOf(id) !== -1) return;
    fieldValue.unshift(id);
    usersRef.doc(userid).update({
        [fieldname]: fieldValue,
    })
    console.log(fieldValue);
}

export const removeTrackIdFromUser = async (fieldname, id) => {
    const userid = auth.currentUser.uid;
    const userDoc = await usersRef.doc(userid).get();
    if (!userDoc.exists) return;
    let userInfo = userDoc.data();
    if (!userInfo.hasOwnProperty(fieldname)) return;

    let fieldValue = userInfo[fieldname];
    if (fieldValue.indexOf(id) === -1) return;
    fieldValue.splice(fieldValue.indexOf(id), 1);
    usersRef.doc(userid).update({
        [fieldname]: fieldValue,
    })
    console.log(fieldValue);
}

export const getUserTracks = async (fieldname) => {
    const userid = auth.currentUser.uid;
    const userDoc = await usersRef.doc(userid).get();
    if (!userDoc.exists) return;
    let userInfo = userDoc.data();
    let fieldValue = [];
    if (userInfo.hasOwnProperty(fieldname))
        fieldValue = userInfo[fieldname];

    let tracks = [];
    console.log(fieldValue);
    await Promise.all(fieldValue.map(async trackid => {
        let trackDoc = await tracksRef.doc(trackid).get();
        if (trackDoc.exists)
            tracks.push(trackDoc.data());
    }));
    console.log(tracks);
    return tracks;
}

export const addAllFavToQueue = async () => {
    const userid = auth.currentUser.uid;
    const userDoc = await usersRef.doc(userid).get();
    if (!userDoc.exists) return;
    let userInfo = userDoc.data();
    let favTracks = [], queueTracks = [];
    if (userInfo.hasOwnProperty('favorite'))
        favTracks = userInfo['favorite'];
    if (userInfo.hasOwnProperty('queue'))
        queueTracks = userInfo['queue'];

    queueTracks = _.union(favTracks, queueTracks);
    console.log(queueTracks);

    usersRef.doc(userid).update({
        'queue': queueTracks,
    })

}

export const usersSubscribe = (callback) => {
    return usersRef.doc(auth.currentUser.uid).onSnapshot((doc) => {
        callback();
    });
}

export const tracksSubscribe = (callback) => {
    return tracksRef.doc(auth.currentUser.uid).onSnapshot((doc) => {
        callback();
    });
}

export const getTracksByOrder = async (field, number) => {
    const tracksSnapshot = await tracksRef.orderBy(field).limit(number).get();
    return tracksSnapshot.docs.map(item => ({id: item.id, ...item.data()}));
}

export const getTracksByCity = async (cityName) => {
    const tracksSnapshot = await tracksRef.where("location", "==", cityName).get();
    return tracksSnapshot.docs.map(item => ({id: item.id, ...item.data()}));
}
