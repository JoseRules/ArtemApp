import axios from "axios"

export const sendImageToServer = (file) => {
    const preset_key = 'hefawgex';
    const cloud_name = 'de3taspqp';
    const cloudinaryURL = `http://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    return axios.post(cloudinaryURL, formData);
}