import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/resume", async (c) => {
	const resume = await c.env.documents.get("resume.pdf");

	if (!resume) {
		return c.text("Resume not found", 404);
	}

	const headers = new Headers();
	resume.writeHttpMetadata(headers);
	headers.set("Content-Type", "application/pdf");
	headers.set("Content-Disposition", 'inline; filename="Nathan-Nakamura-Resume.pdf"');
	headers.set("Cache-Control", "public, max-age=3600");
	headers.set("ETag", resume.httpEtag);

	return new Response(resume.body, { headers });
});

export default app;
