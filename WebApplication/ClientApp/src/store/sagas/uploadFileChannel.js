import { buffers, eventChannel, END } from 'redux-saga';

const uploadFileChannel = (endpoint, file, token) => {
    return eventChannel(emitter => {
        const xhr = new XMLHttpRequest();
        const onProgress = (e) => {
            if (e.lengthComputable) {
                const progress = e.loaded / e.total * 100;
                emitter({ progress });
            }
        };
        const onFailure = (e) => {
            emitter({ err: new Error('Upload failed') });
            emitter(END);
        };
        xhr.upload.addEventListener("progress", onProgress);
        xhr.upload.addEventListener("error", onFailure);
        xhr.upload.addEventListener("abort", onFailure);
        xhr.onreadystatechange = () => {
            const { readyState, status } = xhr;
            if (readyState === 4) {
                if (status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.isSuccessful) {
                        emitter({
                            success: true,
                            //filePath: response.content
                        });
                        emitter(END);
                    }
                    else {
                        onFailure(null);
                    }
                }
                else {
                    onFailure(null);
                }
            }
        };
        xhr.open("POST", endpoint, true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(file);
        return () => {
            xhr.upload.removeEventListener("progress", onProgress);
            xhr.upload.removeEventListener("error", onFailure);
            xhr.upload.removeEventListener("abort", onFailure);
            xhr.onreadystatechange = null;
            xhr.abort();
        };
    }, buffers.sliding(2));
};

export default uploadFileChannel;