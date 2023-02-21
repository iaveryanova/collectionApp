const {initializeApp} = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require("./firebase.config");

const uploadFile = async (file) => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Create a root reference
    const storage = getStorage(app);

    //Create a reference to img
    const fileRef = ref(storage, 'images/' + file.name);

    //Create metadata properties
    const metadata = {
        contentType: file.mimetype,
    };


    const snapshot = await uploadBytes(fileRef, file.data, metadata);
    console.log('Uploaded a blob or file!');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    return downloadURL;
}

module.exports = {uploadFile};