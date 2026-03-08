import imageCompression from 'browser-image-compression';
export const imageCompress = async (file)=>{
    const options = {
        maxSizeMB: 0.5,              // Maximum file size: 500KB
        maxWidthOrHeight: 800,       // Maximum width/height: 800px
        useWebWorker: true,          // Use web worker for better performance
        fileType: 'image/jpeg',      // Convert everything to JPEG
        initialQuality: 0.8          // Quality: 80% (0.0 - 1.0)
    };
    try {
        // console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        
        // Compress the image
        const compressedFile = await imageCompression(file, options);
        
        // console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
        // console.log('Compression ratio:', ((1 - compressedFile.size / file.size) * 100).toFixed(2), '% reduction');
        
        return compressedFile;
    } catch (error) {
        console.error('Compression failed:', error);
        throw error;
    }
}