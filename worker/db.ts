export type Upload = {
    id: number;
    uploader_wallet_pubkey: string;
    transaction_id: string;
    page_id: string;
    meta_tags_json: string;
    created_at: string;
};

// Query function: get recent N rows
export async function queryUploads(env: Env, limit: number): Promise<Upload[]> {
    const stmt = env.DB
        .prepare(
            `SELECT id, uploader_wallet_pubkey, transaction_id, page_id, meta_tags_json, created_at
         FROM uploads
         ORDER BY id DESC
         LIMIT ?1`
        )
        .bind(limit);
    const { results } = await stmt.all<Upload>();
    return results ?? [];
}



// Insert function: add a new row and return it
export async function insertUpload(
    env: Env,
    uploader_wallet_pubkey: string,
    transaction_id: string,
    page_id: string,
    meta_tags_json: string
): Promise<Upload> {
    const stmt = env.DB
        .prepare(
            `INSERT INTO uploads (uploader_wallet_pubkey, transaction_id, page_id, meta_tags_json)
         VALUES (?1, ?2, ?3, ?4)
         RETURNING id, uploader_wallet_pubkey, transaction_id, page_id, meta_tags_json, created_at`
        )
        .bind(
            uploader_wallet_pubkey,
            transaction_id,
            page_id,
            meta_tags_json
        );
    const { results } = await stmt.all<Upload>();
    if (!results || results.length === 0) {
        throw new Error("insert failed");
    }
    return results[0];
}
