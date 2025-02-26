export class CdnStoreService {
    static async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Upload failed: ${error.message}`);
        }

        const data = await response.json();
        return data.url;
    }
}