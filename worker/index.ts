import { handleInsertUpload, handleSearchUploads } from "./handlers";

export default {
  fetch(request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/uploads" && request.method === "GET") {
      return handleSearchUploads(request, env, url);
    }
    if (url.pathname === "/api/uploads" && request.method === "POST") {
      return handleInsertUpload(request, env, url);
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
