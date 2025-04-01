import cloudinary from 'cloudinary'
const cloud = cloudinary.v2

cloud.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

export async function CloudinaryUploadPhoto(item) {
    try {
        const data = await cloud.uploader.upload(item,{resource_type:"auto"});
        return data;
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
export async function CloudinaryRemovePhoto(item) {
    const data = await cloud.uploader.destroy(item);
    return data;
}