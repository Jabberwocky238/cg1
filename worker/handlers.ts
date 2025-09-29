import { insertUpload, queryUploads, type Upload } from "./db";

export async function handleSearchUploads(request: Request, env: Env, url: URL) {
    const limitParam = url.searchParams.get("limit");
    const limit = Math.max(1, Math.min(1000, Number(limitParam ?? 10)));
    const rows = await queryUploads(env, limit);
    return Response.json(rows);
}

export async function handleInsertUpload(request: Request, env: Env, url: URL) {
    const input = await request.json();
    const { uploader_wallet_pubkey, transaction_id, page_id, meta_tags_json } = input as Partial<Upload>;
    const row = await insertUpload(env, uploader_wallet_pubkey!, transaction_id!, page_id!, meta_tags_json!);
    return Response.json(row);
}
