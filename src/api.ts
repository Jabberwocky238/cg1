export type Upload = {
    id: number;
    uploader_wallet_pubkey: string;
    transaction_id: string;
    page_id: string;
    meta_tags_json: string;
    created_at: string;
};

export async function getUploads(limit: number): Promise<Upload[]> {    
    const response = await fetch(`/api/uploads?limit=${limit}`);
    return response.json();
}

export async function insertUpload(upload: Partial<Upload>): Promise<Upload> {
    const response = await fetch(`/api/uploads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(upload),
    });
    return response.json();
}