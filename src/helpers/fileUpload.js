export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/drax2d1vi/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'Recetario')
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if (resp.ok) {
            const cloudResp = await resp.json();
            return {
                url: cloudResp.secure_url,
                nombre: cloudResp.original_filename
            };
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}