import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export const APP_INTERNAL_MEDIA_KEY = {
  IMAGE_CAPTURE: 'img_capture', // Ảnh chụp từ camera
  IMAGE_LIBRARY: 'img_library', // Ảnh chọn từ thư viện
  IMAGE_EDITED: 'img_edited', // Ảnh đã chỉnh sửa
  IMAGE_TEMP: 'img_temp', // Ảnh tạm thời

  VIDEO_CAPTURE: 'vid_capture', // Video quay từ camera
  VIDEO_LIBRARY: 'vid_library', // Video chọn từ thư viện
  VIDEO_EDITED: 'vid_edited', // Video đã chỉnh sửa
  VIDEO_TEMP: 'vid_temp', // Video tạm thời

  THUMBNAIL: 'thumb', // Thumbnail video
  FILE_GENERIC: 'file', // Tệp khác (PDF, DOCX...)
};

const ROOT_PATH =
  Platform.OS === 'android'
    ? RNFS.DocumentDirectoryPath
    : RNFS.LibraryDirectoryPath;

const IMAGE_FOLDER = `${ROOT_PATH}/images`;
const VIDEO_FOLDER = `${ROOT_PATH}/videos`;

const createFolderIfNotExists = async path => {
  const exists = await RNFS.exists(path);
  if (!exists) {
    await RNFS.mkdir(path);
  }
};

// Save generic file
const saveFile = async (fileUri, fileName) => {
  try {
    const dest = `${ROOT_PATH}/${fileName}`;
    await RNFS.copyFile(fileUri, dest);
    return dest;
  } catch (err) {
    console.log('❌ Save file failed:', err);
    return null;
  }
};

// Save image into /images
const saveImage = async (fileUri, fileName) => {
  try {
    await createFolderIfNotExists(IMAGE_FOLDER);
    const dest = `${IMAGE_FOLDER}/${fileName}`;
    await RNFS.copyFile(fileUri, dest);
    return dest;
  } catch (err) {
    console.log('❌ Save image failed:', err);
    return null;
  }
};

// Save video into /videos
const saveVideo = async (fileUri, fileName) => {
  try {
    await createFolderIfNotExists(VIDEO_FOLDER);
    const dest = `${VIDEO_FOLDER}/${fileName}`;
    await RNFS.copyFile(fileUri, dest);
    return dest;
  } catch (err) {
    console.log('❌ Save video failed:', err);
    return null;
  }
};

// Delete file by full path
const deleteFile = async filePath => {
  try {
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
    }
    return true;
  } catch (err) {
    console.log('❌ Delete failed:', err);
    return false;
  }
};

// List all files in /images
const listImages = async () => {
  try {
    await createFolderIfNotExists(IMAGE_FOLDER);
    return await RNFS.readDir(IMAGE_FOLDER);
  } catch (err) {
    console.log('❌ List images failed:', err);
    return [];
  }
};

// List all files in /videos
const listVideos = async () => {
  try {
    await createFolderIfNotExists(VIDEO_FOLDER);
    return await RNFS.readDir(VIDEO_FOLDER);
  } catch (err) {
    console.log('❌ List videos failed:', err);
    return [];
  }
};

export const appInternalMedia = {
  saveFile,
  saveImage,
  saveVideo,
  deleteFile,
  listImages,
  listVideos,
};
