export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('FileReader did not return a string.'));
      } else {
        // result is "data:image/jpeg;base64,LzlqLzRBQ..."
        // We need to remove the prefix "data:[<mediatype>];base64,"
        const base64String = reader.result.split(',')[1];
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error('Could not extract base64 string from file.'));
        }
      }
    };
    reader.onerror = (error) => reject(error);
  });
};