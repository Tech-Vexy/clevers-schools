import { getDownloadURL, listAll, ref, StorageReference } from 'firebase/storage';
import { storage } from './firebase';

interface FileItem {
    name: string;
    url: string;
}

export async function getAllFilesInFolder(folderPath: string): Promise<FileItem[]> {
    const folderRef: StorageReference = ref(storage, folderPath);

    try {
        const fileList = await listAll(folderRef);

        const filePromises: Promise<FileItem>[] = fileList.items.map(async (itemRef: StorageReference) => {
            const url: string = await getDownloadURL(itemRef);
            return {
                name: itemRef.name,
                url
            };
        });

        return await Promise.all(filePromises);
    } catch (error) {
        console.error('Error retrieving files:', error);
        return [];
    }
}